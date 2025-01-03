// Generated by CoffeeScript 2.6.1
var DataTypes;

({DataTypes} = require('sequelize'));

module.exports = (mysql) => {
  var data;
  data = {
    relationid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    whoUse: {
      type: DataTypes.STRING,
      allowNull: false
    },
    group: {
      type: DataTypes.STRING
    },
    key: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    group2: {
      type: DataTypes.STRING
    },
    key2: {
      type: DataTypes.STRING
    },
    value2: {
      type: DataTypes.STRING
    },
    type2: {
      type: DataTypes.STRING
    },
    group3: {
      type: DataTypes.STRING
    },
    key3: {
      type: DataTypes.STRING
    },
    value3: {
      type: DataTypes.STRING
    },
    type3: {
      type: DataTypes.STRING
    }
  };
  return mysql.define("icat_relations", data, {
    indexes: [
      ...(["whoUse",
      "group",
      "key",
      "type",
      "value",
      "group2",
      "key2",
      "type2",
      "value2",
      "group3",
      "key3",
      "type3",
      "value3"].map((item) => {
        return {
          fields: [item]
        };
      }))
    ],
    freezeTableName: true
  });
};
