// Generated by CoffeeScript 2.6.1
var Iron, fs, installData, m, pathLib, render;

if (!global.window) {
  global.window = global.document = global.requestAnimationFrame = void 0;
}

m = require("mithril");

render = require("mithril-node-render");

fs = require("fs-extra");

pathLib = require("path");

Iron = require("@hapi/iron");

installData = require("../../install_data");

module.exports = function(server) {
  return server.route({
    path: "/",
    method: "get",
    options: {
      auth: {
        mode: "try"
      }
    },
    handler: async function(req, h) {
      var err, html, installed, ref, ref1, tmp;
      try {
        installed = (await (async function() {
          try {
            tmp = (await fs.readFile(pathLib.resolve("./installed.json")));
            return tmp = JSON.parse(tmp.toString());
          } catch (error) {
            err = error;
            return false;
          }
        })());
        html = render.sync(m("html[lang=zh]", [
          m("head",
          [
            m("title",
            "喵空间社区程序 控制器"),
            m("style",
            `html,body{
  margin:0;padding:0;
  font-size:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
}
body{
  font-size:1.3rem;
}
h1{
  font-weight:normal;
}
label{
  display:flex;
  flex-direction:column;
  font-size:1.3rem;
  color:#666;
  max-width:50rem;
}
.box{
  margin:1rem;
  padding:0.5rem;
  border-radius:1rem;
  min-width:10rem;
  border:none;
  background-color:#eee;
}
.box-btn{
  min-height:4rem;
  padding:0.5rem 0.3rem;
  cursor:pointer;
}
.box-btn:hover{
  background:#ccc;
}

.box-text{
  height:4rem;
  border:0.1rem solid #ccc;
}
.box-text:focus{
  border:0.1rem solid #65db87;
  outline:0.1rem solid #65db87;
}
.mrl-0{
  margin-left:0
}`)
          ]),
          m("body",
          [
            m("h1",
            "喵空间社区程序 控制器"),
            !installed ? m("form[action=/][method=post]",
            [
              m("label",
              [
                "面板访问密码 至少8位",
                m("input.box.box-text.mrl-0[type=text][placeholder=面板访问密码]",
                {
                  value: "",
                  name: "panelPwd"
                })
              ]),
              m("label",
              [
                "数据库主机（仅支持postgre数据库）",
                m("input.box.box-text.mrl-0[type=text][placeholder=数据库主机]",
                {
                  value: "localhost",
                  name: "dbHost"
                })
              ]),
              m("label",
              [
                "数据库端口",
                m("input.box.box-text.mrl-0[type=text][placeholder=数据库地址]",
                {
                  value: "5432",
                  name: "dbPort"
                })
              ]),
              m("label",
              [
                "数据库名",
                m("input.box.box-text.mrl-0[type=text][placeholder=数据库名]",
                {
                  name: "dbName"
                })
              ]),
              m("label",
              [
                "数据库用户名",
                m("input.box.box-text.mrl-0[type=text][placeholder=数据库用户名]",
                {
                  name: "dbUser"
                })
              ]),
              m("label",
              [
                "数据库密码",
                m("input.box.box-text.mrl-0[type=text][placeholder=数据库密码]",
                {
                  name: "dbPassword"
                })
              ]),
              m("label",
              [
                "密码加密密钥 请重点保存且勿丢失，否则无法登录 需要大于32位",
                m("input.box.box-text.mrl-0[type=text][placeholder=密码加密密钥]",
                {
                  name: "pwdKey"
                })
              ]),
              m("label",
              [
                "登录状态密钥 需要大于32位",
                m("input.box.box-text.mrl-0[type=text][placeholder=登录状态密钥]",
                {
                  name: "cookiePwd"
                })
              ]),
              m("input.box.box-btn.mrl-0[type=submit]",
              {
                value: "生成启动配置"
              })
            ]) : !req.auth.credentials ? [
              m("form[action=/login][method=post]",
              [
                m("input.box.box-text[type=password][placeholder=请输入密码]",
                {
                  name: "password"
                }),
                m("input[type=submit].box.box-btn",
                {
                  value: "登录"
                })
              ])
            ] : [
              m("",
              "配置文件已就绪"),
              !((ref = installData.miao) != null ? ref.process : void 0) || ((ref1 = installData.miao.process) != null ? ref1.killed : void 0) ? m("form[action=/start][method=post]",
              [m("button.box.box-btn",
              "启动服务")]) : [
                m("",
                "服务已启动在 http://你的地址:8095，重新安装请删除install目录下的installed.json文件"),
                m("",
                "通过ip:端口号访问无法正常登录，请绑定标准域名并配置反向代理到http://localhost:8095"),
                m("",
                "有其它任何问题请前往喵空间社区程序官方论坛反馈"),
                m("",
                "你可以在项目目录执行 npx pm2 logs 查看安装日志，或者刷新本页查看"),
                m(".box",
                {
                  style: {
                    width: "80vw",
                    height: "30rem",
                    overflow: "auto",
                    overflowWrap: "anywhere",
                    wordBreak: "break-all",
                    fontSize: "1.3rem"
                  }
                },
                [
                  installData.miao.logs.map((log) => {
                    return m(".box",
                  [log.info]);
                  })
                ]),
                m("form[action=/stop][method=post]",
                [m("button.box.box-btn",
                "停止服务")])
              ]
            ]
          ])
        ]));
        html = render.sync(m("html[lang=zh]", [
          m("head",
          [m("title",
          "喵空间社区程序 控制器")]),
          m("body",
          [
            m("#main",
            [
              m("script",
              {
                src: "assets/main.js",
                type: "module"
              })
            ])
          ])
        ]));
        html = `<!doctype html>\n${html}`;
        return html;
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