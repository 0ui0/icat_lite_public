// Generated by CoffeeScript 2.6.1
var Iron, fs, installData, pathLib;

fs = require("fs-extra");

installData = require("../../install_data");

Iron = require("@hapi/iron");

pathLib = require("path");

module.exports = (server) => {
  return server.route({
    method: "post",
    path: "/exit",
    handler: function(req, h) {
      var err;
      try {
        h.unstate("install");
        return {
          ok: true,
          msg: "登出成功"
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
