// Generated by CoffeeScript 2.6.1
var Alipay, alipay, fs, options, pathLib, uuid;

options = require("../../config/options");

fs = require("fs-extra");

pathLib = require("path");

uuid = require("uuid").v4;

Alipay = require("alipay-sdk");

alipay = null;

module.exports = {
  method: "post",
  path: "/api/pay/ali/order",
  options: {
    validate: {
      payload: Joi.object({
        amount: Joi.number().integer().min(1).max(10000) //大范围约束
      })
    }
  },
  handler: async function(req, h) {
    var AlipayFormData, aliSwitch, appid, auth, db, description, err, formData, m1DevPriKey, m1DevPriKeyFile, m1DevZfbPubKeyFile, m1ZfbPubKey, maxMoney, minMoney, orderNum, payCredit, payCreditid, payMaxValue, payMinValue, payMode, payRate, que, ref, result, siteBaseName, siteUrl, subject;
    que = req.payload;
    db = req.server.db;
    auth = req.auth.credentials;
    try {
      //检查功能开关
      aliSwitch = (await options.get("pay_aliSwitch"));
      payMode = (await options.get("pay_aliMode"));
      payCreditid = (await options.get("pay_creditid"));
      payCredit = (await db.icat_credits.findOne({
        where: {
          creditid: Number(payCreditid)
        }
      }));
      if (!Number(aliSwitch)) {
        return {
          ok: false,
          msg: "支付宝支付功能已关闭"
        };
      }
      if (Number(payMode) !== 1) {
        return {
          ok: false,
          msg: "支付宝该支付模式尚未支持"
        };
      }
      if (!(payCredit || Number(payCredit.isUse) === 0)) {
        return {
          ok: false,
          msg: "支付积分id无效，或被暂停使用，请联系管理员重新配置"
        };
      }
      payRate = (await options.get("pay_rate"));
      payMinValue = (await options.get("pay_minValue"));
      payMaxValue = (await options.get("pay_maxValue"));
      minMoney = Number(payMinValue) / Number(payRate);
      maxMoney = Number(payMaxValue) / Number(payRate);
      if (!((minMoney <= (ref = que.amount) && ref <= maxMoney))) { //小范围约束
        return {
          ok: false,
          msg: `请输入${minMoney}到${maxMoney}之间的数`
        };
      }
      appid = (await options.get("pay_aliAppid"));
      m1DevPriKey = (await options.get("pay_aliMode1DeveloperPrivateKeyFile"));
      m1ZfbPubKey = (await options.get("pay_aliMode1ZfbPublicKeyFile"));
      m1DevPriKeyFile = (await fs.readFile(pathLib.resolve(`./certs/${m1DevPriKey}`), "ascii"));
      m1DevZfbPubKeyFile = (await fs.readFile(pathLib.resolve(`./certs/${m1ZfbPubKey}`), "ascii"));
      siteBaseName = (await options.get("global_siteBaseName"));
      siteUrl = (await options.get("global_siteUrl"));
      if (alipay == null) {
        alipay = new Alipay.default({
          appId: appid,
          privateKey: m1DevPriKeyFile,
          alipayPublicKey: m1DevZfbPubKeyFile
        });
      }
      orderNum = `t${String(new Date().getTime())}u${auth.uid}_${auth.user}`;
      subject = `${siteBaseName}积分充值`;
      description = `${siteBaseName}(${siteUrl})积分充值`;
      AlipayFormData = require('alipay-sdk/lib/form');
      formData = new AlipayFormData.default();
      formData.setMethod('get');
      formData.addField('notifyUrl', `https://${siteUrl}/api/pay/ali/pay`);
      formData.addField('returnUrl', `https://${siteUrl}/#!/user`);
      formData.addField('bizContent', {
        outTradeNo: orderNum,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: que.amount.toFixed(2),
        subject: subject,
        body: description
      });
      result = (await alipay.exec('alipay.trade.page.pay', {}, {
        formData: formData
      }));
      await db.icat_credits_calc.create({
        uid: auth.uid,
        user: auth.user,
        creditid: payCredit.creditid,
        creditName: payCredit.name,
        calc: que.amount * Number(payRate),
        freeze: 1,
        action: "积分充值",
        type: "pay",
        timestamp: Date.now(),
        payState: 1,
        payPlatform: "支付宝",
        paySystemOrderNum: orderNum,
        paySubject: subject,
        payDescription: description
      });
      return {
        ok: true,
        msg: "请前往支付页面付款",
        url: result
      };
    } catch (error) {
      err = error;
      console.log(err);
      return {
        ok: false,
        msg: "服务器内部错误"
      };
    }
  }
};