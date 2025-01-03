// Generated by CoffeeScript 2.6.1
var config, crypto, fs;

fs = require('fs');

crypto = require('crypto');

/*
!重要 将本文件修改完以后，将文件名改成config.js
*/
console.log(argCfg);

config = {
  //本机
  port: 8095, //服务端口号 默认在8095端口，请配置反向代理到这个端口
  host: "0.0.0.0", //主机地址 ipv6为:: 如果是ipv4，本机请填写127.0.0.1或localhost
  getUrl: function() {
    if (this.tls) {
      return `https://${this.host}:${this.port}`;
    } else {
      return `http://${this.host}:${this.port}`;
    }
  },
  key: "这里的内容是密码md5加密用的，请务必替换成你生成的随机字符，并切勿泄露，并且记得保存，一旦丢失或修改将无法登录",
  password: "这里是加密登录状态的密码，请也务必替换成随机字符，这个不用保存，每次可以不一样",
  public: "www",
  md5: function(str) {
    var obj;
    obj = crypto.createHash("md5");
    obj.update(str);
    return obj.digest("hex");
  },
  db: { //postgres
    connectionLimit: 10, //连接池连接数限制
    host: "localhost", //数据库主机
    port: 5432, //数据库端口 postgre默认端口5432 mysql默认端口3306
    user: "postgres", //数据库用户名
    database: "yourdb", //数据库名
    password: "postgres", //数据库密码
    dialect: "postgres" //postgres或mysql
  }
};

if (argCfg.pwdKey) {
  config.key = argCfg.pwdKey;
}

if (argCfg.cookiePwd) {
  config.password = argCfg.cookiePwd;
}

if (argCfg.host) {
  config.host = argCfg.host;
}

if (argCfg.port) {
  config.port = argCfg.port;
}

if (argCfg.dbPort) {
  config.db.port = argCfg.dbPort;
}

if (argCfg.dbHost) {
  config.db.host = argCfg.dbHost;
}

if (argCfg.dbName) {
  config.db.database = argCfg.dbName;
}

if (argCfg.dbUser) {
  config.db.user = argCfg.dbUser;
}

if (argCfg.dbPassword) {
  config.db.password = argCfg.dbPassword;
}

module.exports = config;
