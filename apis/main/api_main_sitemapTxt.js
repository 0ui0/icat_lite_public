// Generated by CoffeeScript 2.6.1
var Op, blocks, m, options, posts, render, timestamp;

if (!global.window) {
  global.window = global.document = global.requestAnimationFrame = void 0;
}

({Op} = require("sequelize"));

m = require("mithril");

render = require("mithril-node-render");

options = require("../../config/options");

posts = null;

blocks = null;

timestamp = 0;

module.exports = {
  method: "get",
  path: "/sitemap.txt",
  options: {
    auth: false
  },
  handler: async function(req, h) {
    var auth, db, err, global_siteUrl, par, que, sitemap;
    que = req.query;
    db = req.server.db;
    auth = req.auth.credentials;
    par = req.params;
    try {
      global_siteUrl = (await options.get("global_siteUrl"));
      if (Date.now() - timestamp > 10 * 60 * 1000) {
        posts = (await db.icat_posts.findAll({
          attributes: ["pid", "title", "linkid"],
          limit: 300,
          offset: 0,
          order: [["pid", "desc"]]
        }));
        blocks = (await db.icat_posts.findAll({
          attributes: ["pid", "title", "linkid"],
          where: {
            contentType: "block"
          }
        }));
        timestamp = Date.now();
      }
      sitemap = "";
      posts.forEach((post) => {
        sitemap += `https://${global_siteUrl}/null-${post.pid}-null.html\n`;
        return sitemap += `https://${global_siteUrl}/post_list/${post.pid}_-1_0_0.html\n`;
      });
      return h.response(sitemap).type("text/plain");
    } catch (error) {
      err = error;
      console.log(err);
      return h.response(`<!DOCTYPE html>
<html>
  <head>
    <title>${title} - 发生了奇怪的状况</title>
    <meta charset="utf-8">
    <body>┭┮﹏┭┮呜呜，服务器好像不理咱了，要不一会儿再调戏它？</body>
  </head>
</html>`).code(500);
    }
  }
};