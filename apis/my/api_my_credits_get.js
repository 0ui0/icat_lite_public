// Generated by CoffeeScript 2.6.1
var createAPI, sequelize;

createAPI = require("../../tools/api/createAPI");

sequelize = require("sequelize");

module.exports = createAPI("my/credit", {
  cnName: "我的积分",
  tableName: "icat_credits_calc",
  idName: "creditCalcid",
  getFindOneWhere: function({auth}) {
    return {
      uid: (auth != null ? auth.uid : void 0) || 0
    };
  },
  getFindAllWhere: function({auth}) {
    return {
      uid: (auth != null ? auth.uid : void 0) || 0
    };
  },
  getAllCountWhere: function({auth}) {
    return {
      uid: (auth != null ? auth.uid : void 0) || 0
    };
  },
  getChangeReturnData: async function(sendParams) {
    var auth, countDatas, credits, db, que;
    ({db, que, auth} = sendParams);
    countDatas = (await db.icat_credits_calc.findAll({
      attributes: [
        "creditid",
        //"creditName"
        [sequelize.fn("sum",
        sequelize.col("calc")),
        "totalCalc"]
      ],
      group: ["creditid"],
      //"creditName"
      where: {
        uid: (auth != null ? auth.uid : void 0) || 0,
        freeze: 0
      }
    }));
    credits = (await db.icat_credits.findAll());
    sendParams.returnData.countDatas = JSON.parse(JSON.stringify(countDatas));
    return sendParams.returnData.countDatas.forEach((countData) => {
      return countData.creditName = (credits.find((credit) => {
        return credit.creditid === countData.creditid;
      })).name;
    });
  }
}).get;