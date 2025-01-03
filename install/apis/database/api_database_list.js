// Generated by CoffeeScript 2.6.1
var QueryTypes, childProcess, fs, installData, pathLib;

fs = require("fs-extra");

pathLib = require("path");

installData = require("../../install_data");

childProcess = require("child_process");

({QueryTypes} = require("sequelize"));

module.exports = (server) => {
  return server.route({
    method: "get",
    path: "/database/list",
    handler: async function(req, h) {
      var err, list;
      try {
        if (!installData.seq) {
          return {
            ok: false,
            msg: "未连接到数据库，请启动服务"
          };
        }
        list = (await installData.seq.query("SELECT datname FROM pg_database WHERE datistemplate = false;", {
          type: QueryTypes.SELECT
        }));
        console.log(list);
        return {
          ok: true,
          data: list,
          msg: "获取数据库列表成功"
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
