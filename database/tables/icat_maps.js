// Generated by CoffeeScript 2.6.1
var DataTypes;

({DataTypes} = require('sequelize'));

module.exports = (mysql) => {
  var data;
  data = {
    mapid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    showName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    metaData: {
      type: DataTypes.TEXT("long")
    },
    note: {
      type: DataTypes.TEXT
    },
    //如果用附件关联以下字段无效
    path: {
      type: DataTypes.TEXT
    },
    url: {
      type: DataTypes.TEXT
    },
    miniPath: { //小地图
      type: DataTypes.TEXT
    },
    miniUrl: {
      type: DataTypes.TEXT
    },
    prohibitPath: {
      type: DataTypes.TEXT
    },
    prohibitUrl: {
      type: DataTypes.TEXT
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    miniWidth: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    miniHeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  };
  return mysql.define("icat_maps", data, {
    indexes: [
      ...(["name",
      "showName"].map((item) => {
        return {
          fields: [item]
        };
      }))
    ],
    freezeTableName: true
  });
};
