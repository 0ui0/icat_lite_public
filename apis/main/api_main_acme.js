// Generated by CoffeeScript 2.6.1
var fs, index, pathLib;

index = require("./index");

pathLib = require("path");

fs = require("fs-extra");

module.exports = {
  path: "/.well-known/{param*}", //pid linkid limit offset count
  method: "get",
  options: {
    auth: false
  },
  handler: async function(req, h) {
    var err, file;
    try {
      file = (await fs.readFile(pathLib.resolve(`./.well-known/${req.params.param}`)));
      return h.response(file).type("text/plain").code(200);
    } catch (error) {
      err = error;
      console.log(err);
      return h.response(404).code(404);
    }
  }
};
