// Generated by CoffeeScript 2.6.1
var DataTypes;

({DataTypes} = require('sequelize'));

module.exports = (mysql) => {
  var data;
  data = {
    orderid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orderNum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tradeNo: { //第三方平台交易单号
      type: DataTypes.STRING
    },
    sellerId: { //第三方平台用户号 
      type: DataTypes.STRING
    },
    totalAmount: { //交易金额
      type: DataTypes.DOUBLE
    },
    merchantOrderNo: { //第三方平台原始订单号（支付宝）
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "通用"
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    payState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sendState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    receiveState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    refundState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  };
  return mysql.define("icat_orders", data, {
    freezeTableName: true
  });
};
