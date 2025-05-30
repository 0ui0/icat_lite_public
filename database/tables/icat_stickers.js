// Generated by CoffeeScript 2.6.1
var DataTypes;

({DataTypes} = require('sequelize'));

//表情
module.exports = (mysql) => {
  var data;
  data = {
    stackerid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allNull: false
    },
    sign: {
      type: DataTypes.STRING,
      allNull: false
    },
    url: {
      type: DataTypes.STRING,
      allNull: false
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "默认表情",
      allNull: false
    }
  };
  return mysql.define("icat_stickers", data, {
    freezeTableName: true
  });
};
