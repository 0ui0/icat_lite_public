// Generated by CoffeeScript 2.6.1
var cacheOpera;

cacheOpera = require("./cacheOpera");

module.exports = {
  method: "post",
  path: "/api/posts/del/{pid}",
  options: {
    validate: {
      params: Joi.object({
        pid: Joi.string().pattern(/^\d+$/).required(),
        includeReply: Joi.number().min(0).max(1)
      })
    }
  },
  handler: async function(req, h) {
    var auth, author, db, e, fn, isMine, pid, preDelPost, que, t, upPost;
    que = req.payload;
    auth = req.auth.credentials;
    db = req.server.db;
    try {
      pid = Number(req.params.pid);
      preDelPost = (await db.icat_posts.findOne({
        attributes: ["pid", "uid", "linkid", "contentType"],
        where: {
          pid: pid
        }
      }));
      if (!preDelPost) {
        return {
          ok: false,
          msg: "帖子不存在"
        };
      }
      upPost = (await db.icat_posts.findOne({
        attributes: ["pid", "linkid", "calcTimestamp"],
        where: {
          pid: preDelPost.linkid
        }
      }));
      if (preDelPost.contentType !== "note") {
        if (auth.icat_users_extend.power < 80) {
          return {
            ok: false,
            msg: "暂不支持，投票删除系统正在开发中"
          };
        }
      }
      if (!preDelPost) {
        return {
          ok: false,
          msg: "帖子不存在"
        };
      }
      author = (await db.icat_users_extend.findOne({
        attributes: ["uid", "power"],
        where: {
          uid: preDelPost.uid
        }
      }));
      if (author) {
        if (auth.icat_users_extend.power < author.power) {
          return {
            ok: false,
            msg: "帖子作者的权限大于你的权限哦"
          };
        }
      }
      if (upPost) { //清除父级帖子统计缓存
        upPost.calcTimestamp = 0;
        await upPost.save();
      }
      t = (await db.mysql.transaction());
      fn = async function(pid) {
        var i, len, post, posts, results;
        posts = (await db.icat_posts.findAll({
          attributes: ["pid"],
          where: {
            linkid: pid
          },
          transaction: t
        }));
        results = [];
        for (i = 0, len = posts.length; i < len; i++) {
          post = posts[i];
          await fn(post.pid);
          results.push((await post.destroy({
            transaction: t
          })));
        }
        return results;
      };
      isMine = preDelPost.uid === auth.uid ? true : false;
      if (isMine || auth.icat_users_extend.power >= 90) { //管理员删除
        await fn(pid);
        //清理帖子缓存
        await cacheOpera.clean(db, preDelPost);
        await preDelPost.destroy();
        await t.commit();
        return {
          ok: true,
          msg: "删除成功"
        };
      } else {
        return {
          ok: false,
          msg: "权限不足"
        };
      }
    } catch (error) {
      e = error;
      console.log(e);
      return (await t.rollback());
    }
  }
};