// Generated by CoffeeScript 2.6.1
var QueryTypes, childProcess, fs, installData, pathLib;

fs = require("fs-extra");

pathLib = require("path");

installData = require("../../install_data");

childProcess = require("child_process");

({QueryTypes} = require("sequelize"));

module.exports = (server) => {
  return server.route({
    method: "post",
    path: "/database/roles/get/{oid}",
    options: {
      validate: {
        params: Joi.object({
          oid: Joi.number().min(1).required()
        }),
        payload: Joi.object({
          rolename: Joi.string().required(),
          rolsuper: Joi.boolean().required()
        })
      }
    },
    handler: async function(req, h) {
      var data, err, par, que;
      try {
        par = req.params;
        que = req.payload;
        if (!installData.seq) {
          return {
            ok: false,
            msg: "未连接到数据库，请启动服务"
          };
        }
        if (!par.oid) {
          return {
            ok: false,
            msg: "请指定oid"
          };
        }
        data = (await installData.seq.query("UPDATE pg_roles SET rolename=? rolsuper=? WHERE oid=?", {
          type: QueryTypes.RAW,
          replacements: [que.rolename, que.rolsuper, par.oid]
        }));
        console.log(data);
        return {
          ok: true,
          data: data,
          msg: "更新数据库角色数据成功"
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
  });
};