// Generated by CoffeeScript 2.6.1
var fs, pathLib;

fs = require("fs-extra");

pathLib = require("path");

module.exports = async function(server) {
  var checkDir, err, file, file2, files, files2, i, isDir, len, results, root, route;
  try {
    //静态路由
    //await server.route require "./api_dist"
    //await server.route require "./api_data"
    root = pathLib.resolve("./apis") + "/";
    files = (await fs.readdir(root));
    checkDir = async function(path) {
      return ((await fs.stat(root + path))).isDirectory();
    };
    results = [];
    for (i = 0, len = files.length; i < len; i++) {
      file = files[i];
      isDir = (await checkDir(file));
      if (isDir) {
        files2 = (await fs.readdir(root + file));
        results.push((await (async function() {
          var j, len1, ref, results1;
          results1 = [];
          for (j = 0, len1 = files2.length; j < len1; j++) {
            file2 = files2[j];
            if (file2.match(/^api_/) && file2.match(/.js$/)) {
              //检测是否是合法路由JSON
              if ((ref = (route = require(`./${file}/${file2}`))) != null ? ref.method : void 0) {
                //输出已转载的路由
                //console.log "./#{file}/#{file2}"
                //好像有一丢丢bug
                /*
                route.options ?= {}
                route.options.cors?={}
                route.options.cors.origin = [
                  "http://localhost"
                  "http://localhost:8080"
                  "http://192.168.2.78:8080"
                  "http://[::1]"
                  "http://[::1]:8080"

                ]
                route.options.cors.credentials = true #允许认证身份
                */
                results1.push((await server.route(route)));
              } else {
                results1.push(void 0);
              }
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        })()));
      } else {
        results.push(void 0);
      }
    }
    return results;
  } catch (error) {
    err = error;
    return console.log(err);
  }
};