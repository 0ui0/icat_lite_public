// Generated by CoffeeScript 2.6.1
var Op, createAPI;

createAPI = require("../../tools/api/createAPI");

({Op} = require("sequelize"));

module.exports = createAPI("user", {
  tableName: "icat_users_extend",
  idName: "uid",
  cnName: "用户",
  getPower: 90,
  getQuery: {
    user: Joi.string(),
    name: Joi.string(),
    email: Joi.string(),
    powerMin: Joi.number(),
    powerMax: Joi.number()
  },
  getFindAllWhere: function(sendParams) {
    var auth, config, db, h, output, par, que, req, t;
    ({req, h, db, que, par, auth, config, t} = sendParams);
    output = {};
    if (que.name) {
      output = {
        name: {
          [Op.regexp]: que.name
        }
      };
    }
    if (que.user) {
      output = {
        ...output,
        user: {
          [Op.regexp]: que.user
        }
      };
    }
    if (que.email) {
      output = {
        ...output,
        email: {
          [Op.regexp]: que.email
        }
      };
    }
    if ((que.powerMin != null) || (que.powerMax != null)) {
      output = {
        ...output,
        power: {
          [Op.between]: [que.powerMin, que.powerMax]
        }
      };
    }
    return output;
  }
/*
getFindAll:(sendParams)->
  {req,h,db,que,par,auth,config,t} = sendParams
  return
    include:[
      {
        model:db.icat_goods
      }
      {
        model:db.icat_cdkeys
      }
      {
        model:db.icat_credits_calc
      }
    ]
*/
}).get;
