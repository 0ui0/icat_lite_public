// Generated by CoffeeScript 2.6.1
var fileType, fs, pathLib;

pathLib = require("path");

fs = require("fs-extra");

fileType = require("file-type");

module.exports = {
  method: "post",
  path: "/api/avatar/set",
  options: {
    payload: {
      output: "stream",
      //uploads:pathLib.resolve "./www/data/avatars"
      parse: true,
      allow: 'multipart/form-data',
      multipart: true,
      maxBytes: 5 * 1024 * 1024
    }
  },
  handler: async function(req, h) {
    var auth, db, err, que, time, type, userImgDir, writeStream;
    que = req.payload;
    db = req.server.db;
    auth = req.auth.credentials;
    userImgDir = pathLib.resolve("www/data/" + auth.userDir + "/avatar");
    try {
      type = (await fileType.fromBuffer(que.avatar._data));
      console.log(type);
      if (!type || type.mime.match(/image/g === null)) {
        return {
          ok: false,
          msg: "不支持的文件类型"
        };
      }
      await fs.mkdirs(userImgDir);
      time = Date.now();
      // ===== 创建写入流
      writeStream = new fs.createWriteStream(`${userImgDir}/${time}.${type.ext}`);
      // 所有的头像流接入写入流    
      que.avatar.pipe(writeStream);
      // =====
      await db.icat_users_extend.update({
        avatar: `/data/${auth.userDir}/avatar/${time}.${type.ext}`
      }, {
        where: {
          uid: auth.uid
        }
      });
      return {
        valid: true,
        msg: "上传成功"
      };
    } catch (error) {
      err = error;
      console.log(err);
      return {
        valid: false,
        msg: "服务器内部错误"
      };
    }
  }
};