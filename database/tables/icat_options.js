// Generated by CoffeeScript 2.6.1
var DataTypes;

({DataTypes} = require('sequelize'));

module.exports = (mysql) => {
  var data;
  data = {
    optionid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("value"));
      },
      set: function(value) {
        return this.setDataValue("value", JSON.stringify(value));
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    joi: {
      type: DataTypes.TEXT
    },
    group1: {
      type: DataTypes.STRING
    },
    group2: {
      type: DataTypes.STRING
    },
    group3: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  };
  return mysql.define("icat_options", data, {
    freezeTableName: true
  });
};