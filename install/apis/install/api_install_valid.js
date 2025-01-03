// Generated by CoffeeScript 2.6.1
var Iron, childProcess, fs, installData, pathLib;

fs = require("fs-extra");

installData = require("../../install_data");

Iron = require("@hapi/iron");

pathLib = require("path");

childProcess = require("child_process");

module.exports = (server) => {
  return server.route({
    method: "get",
    path: "/valid",
    options: {
      auth: {
        mode: "try"
      }
    },
    handler: async function(req, h) {
      var err, ref, ret;
      try {
        ret = {
          ok: true,
          data: {
            login: ((ref = req.auth) != null ? ref.credentials : void 0) != null,
            installed: (await (async function() {
              try {
                return ((await fs.stat(pathLib.resolve("./installed.json")))) != null;
              } catch (error) {
                err = error;
                return false;
              }
            })()),
            dbInstalled: (await (async function() {
              try {
                return ((await fs.stat(pathLib.resolve("/Users/miao/pgsql")))) != null;
              } catch (error) {
                err = error;
                return false;
              }
            })())
          }
        };
        if (!ret.data.login) {
          h.unstate("install");
        }
        
        //console.log ret
        return ret;
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
