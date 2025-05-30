// Generated by CoffeeScript 2.6.1
var DataTypes, config;

({DataTypes} = require('sequelize'));

config = require("../../config/config");

module.exports = (mysql) => {
  var data;
  data = {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //unique:yes
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function(value) {
        
        // 二次
        if (!global.offMd5PassWord) {
          return this.setDataValue('password', config.md5((config.md5(value)) + config.key));
        } else {
          return this.setDataValue('password', value);
        }
      }
    }
  };
  return mysql.define("icat_users", data, {
    indexes: [
      ...(["user",
      "password"].map((item) => {
        return {
          fields: [item]
        };
      }))
    ],
    freezeTableName: true
  });
};
