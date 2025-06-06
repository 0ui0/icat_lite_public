// Generated by CoffeeScript 2.6.1
var ActionCheck, actionCheck, config, crypto, md5;

crypto = require("crypto");

config = require("../../config/config");

md5 = config.md5;

ActionCheck = require("../../tools/actionCheck/actionCheck_main");

actionCheck = new ActionCheck();

module.exports = {
  method: "post",
  path: "/api/auth/center",
  options: {
    validate: {
      payload: Joi.object({
        code: Joi.string().token()
      })
    }
  },
  handler: async function(req, h) {
    var actionCheckStatus, auth, db, err, mail, needTime, que, token;
    que = req.payload;
    db = req.server.db;
    mail = req.server.mail;
    auth = req.auth.credentials;
    try {
      if (auth.icat_users_extend.emailVerify === 0) {
        return {
          ok: false,
          msg: "未绑定可用的安全认证服务"
        };
      }
      actionCheckStatus = (await actionCheck.emailVerify(auth.icat_users_extend.email, que.code, auth, db));
      if (actionCheckStatus.returnObj) {
        return actionCheckStatus.returnObj;
      } else if (actionCheckStatus.verifySucess) {
        //下发令牌
        token = Jwt.token.generate({
          aud: auth.user + "|" + "auth.uid",
          iss: "api/auth/center",
          user: auth.user,
          uid: auth.uid
        }, {
          key: config.key,
          alogorithm: "HS512"
        }, {
          ttlSec: needTime = 2 * 60
        });
        //使用后清除当前验证码
        $store.tmpUsers.opera((obj) => {
          obj[auth.uid] = void 0;
          return obj;
        });
        return {
          ok: true,
          msg: "验证成功，请尽快操作。",
          data: token
        };
      } else {
        return {
          ok: false,
          msg: "逻辑错误"
        };
      }
    } catch (error) {
      err = error;
      console.log(err);
      return {
        ok: false,
        msg: "发生了一些错误"
      };
    }
  }
};
