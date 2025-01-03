// Generated by CoffeeScript 2.6.1
/*
  desc
  linkid
  limit
*/
var Op, options, readPermFn, sequelize, spider;

({Op} = require("sequelize"));

sequelize = require("sequelize");

spider = require("./spider");

options = require("../../config/options");

readPermFn = async(tmp, ext) => {
  var auth, db, err, replyed, upPost;
  try {
    ({auth, db} = ext);
    if (!tmp) {
      return;
    }
    if (tmp.isPrivate === 1) {
      if ((auth != null ? auth.uid : void 0) === void 0 || ((auth != null ? auth.uid : void 0) !== tmp.uid && (auth != null ? auth.icat_users_extend.power : void 0) < 90)) {
        tmp.content = "【作者已设置内容仅自己可见】";
      }
    } else if (tmp.isPrivate === 2) {
      upPost = (await db.icat_posts.findOne({
        attributes: ["pid", "linkid", "uid"],
        raw: true,
        where: {
          pid: tmp.linkid
        }
      }));
      if ((auth != null ? auth.uid : void 0) === void 0 || ((auth != null ? auth.uid : void 0) !== (upPost != null ? upPost.uid : void 0) && (auth != null ? auth.uid : void 0) !== tmp.uid && (auth != null ? auth.icat_users_extend.power : void 0) < 90)) {
        tmp.content = "【作者已设置内容仅上级楼主可见】";
      }
    } else if (tmp.isPrivate === 3) {
      replyed = (await db.icat_posts.findOne({
        attributes: ["pid", "linkid", "uid"],
        raw: true,
        where: {
          linkid: tmp.pid,
          uid: (auth != null ? auth.uid : void 0) || -1
        }
      }));
      if ((auth != null ? auth.uid : void 0) === void 0 || (!replyed && (auth != null ? auth.icat_users_extend.power : void 0) < 90)) {
        tmp.content = "【作者已设置内容仅回复者可见】";
      }
    } else if (tmp.isPrivate === 4) {
      upPost = (await db.icat_posts.findOne({
        attributes: ["pid", "linkid", "uid"],
        raw: true,
        where: {
          pid: tmp.linkid
        }
      }));
      replyed = (await db.icat_posts.findOne({
        attributes: ["pid", "linkid", "uid"],
        raw: true,
        where: {
          linkid: tmp.pid,
          uid: (auth != null ? auth.uid : void 0) || -1
        }
      }));
      if ((auth != null ? auth.uid : void 0) === void 0 || (!replyed && (auth != null ? auth.uid : void 0) !== tmp.uid && (auth != null ? auth.uid : void 0) !== (upPost != null ? upPost.uid : void 0) && (auth != null ? auth.icat_users_extend.power : void 0) < 90)) {
        tmp.content = "【作者已设置内容仅上级楼主或回复者可见】";
      }
    }
    //封存帖子
    if (tmp.isHide && (tmp.contentType === "bbcode" || tmp.contentType === "markdown")) {
      tmp.title = "该帖子已封存，无法查看";
      tmp.content = "【该帖子已封存，无法查看】";
      tmp.icat_files = [];
    }
    //回复可见
    replyed = (await db.icat_posts.findOne({
      attributes: ["pid", "uid", "linkid"],
      raw: true,
      where: {
        uid: (auth != null ? auth.uid : void 0) || -1,
        linkid: tmp.pid
      }
    }));
    if (!(replyed || (auth != null ? auth.icat_users_extend.power : void 0) >= 90 || (auth != null ? auth.uid : void 0) === tmp.uid)) {
      return tmp.content = tmp.content.replace(/\[hide\][\s\S]*\[\/hide\]/g, "【本内容已隐藏，回复后刷新可见哦】");
    }
  } catch (error) {
    err = error;
    throw err;
  }
};

module.exports = {
  method: "get",
  path: "/api/posts/get/{pid?}",
  options: {
    auth: {
      mode: "try"
    },
    validate: {
      params: Joi.object({
        pid: Joi.number()
      }),
      query: Joi.object({
        pid: Joi.number(),
        linkid: Joi.number(),
        dzTid: Joi.number(),
        word: Joi.string().pattern(/^[^"'\{\}\[\]\(\)]+$/),
        uid: Joi.number(),
        offset: Joi.number().default(0),
        //limit:Joi.string().pattern(/^\d[0-5]{0,}$/).default("8")
        limit: Joi.number().max(150).default(8),
        order: Joi.string().pattern(/desc|asc/i).default("asc"),
        contentType: Joi.string().pattern(/markdown|block|sysFile|bbcode|note/),
        isPrivate: Joi.number(),
        linkChain: Joi.string().pattern(/^[^"']+$/),
        isTop: Joi.string().pattern(/^\d$/),
        stars: Joi.string(),
        isRandom: Joi.string()
      }).oxor("pid", "linkid", "word", "dzTid")
    }
  },
  handler: async function(req, h) {
    /*
    (
      if que.getNews
        sequelize.literal("random() < 0.05")
    )...
    */
    /*
    tmpOrder.unshift [
      sequelize.literal "random()"
    ]
    */
    var allCount, allCountWhere, allPosts, auth, createPids, data, db, err, finalPost, i, item, j, len, len1, output, par, pids, post, posts_cacheSwitch, posts_cacheTime, prePosts, que, sendParams, thread, tmp, tmpInclude, tmpLimit, tmpOffset, tmpOrder, tmpWhere, tmps;
    db = req.server.db;
    que = req.query;
    auth = req.auth.credentials;
    par = req.params;
    try {
      //爬虫操作
      sendParams = {
        db: db,
        que: que,
        auth: auth,
        par: par,
        req: req,
        h: h
      };
      await spider.run(sendParams);
      tmp = null;
      allCount = null;
      finalPost = null;
      /*
      unless que.uid or que.linkid or que.pid or que.word or req.params.pid
        return
          ok:false
          msg:"参数非法，请检查参数"
      */
      //检查缓存数据
      posts_cacheSwitch = (await options.get("posts_cacheSwitch"));
      if (posts_cacheSwitch) {
        // 定时器，清除缓存
        posts_cacheTime = (await options.get("posts_cacheTime"));
        //统一清除过期缓存
        await db.icat_cache_pids.destroy({
          where: {
            timestamp: {
              [Op.lt]: Date.now() - posts_cacheTime
            }
          }
        });
        await db.icat_cache_linkids.destroy({
          where: {
            timestamp: {
              [Op.lt]: Date.now() - posts_cacheTime
            }
          }
        });
        if ((que.pid != null) || (par.pid != null)) {
          data = (await db.icat_cache_pids.findOne({
            where: {
              que: que,
              par: par
            }
          }));
          if (data) {
            await readPermFn(data.content.data, {auth, db});
            //unless data.content.data?.isPrivate
            return data.content;
          }
        } else {
          data = (await db.icat_cache_linkids.findOne({
            where: {
              que: que,
              par: par
            }
          }));
          if (data) {
            data.content.data = (await (async function() {
              var i, len, ref, results;
              ref = data.content.data;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                post = ref[i];
                await readPermFn(post, {auth, db});
                results.push(post);
              }
              return results;
            })());
            return data.content;
          }
        }
        data = null;
      }
      // 注意参数类型为字符串
      if ((que.pid != null) || (req.params.pid != null) || (que.dzTid != null)) { //如果提供pid，说明需要返回单个帖子
        tmp = (await db.icat_posts.findOne({
          //attributes:["pid","uid","author","title","content","contentType","likes","linkid","isTop","isGood","isLock","globalTop","blockTop","needCheck","timeDelta","views","linkChain","isPrivate","createTimestamp","updateTimestamp","createTime","finallyTime"]
          include: [
            {
              model: db.icat_users_extend,
              attributes: ["uid",
            "user",
            "name",
            "avatar",
            "power"],
              include: [
                {
                  model: db.icat_goods,
                  attributes: ["goodid",
                "name",
                "type",
                "icon",
                "description"],
                  include: db.icat_credits
                },
                {
                  model: db.icat_vars,
                  attributes: ["key",
                "value"],
                  where: {
                    key: {
                      [Op.or]: ["christmasHatSwitch"]
                    }
                  },
                  required: false
                }
              ]
            },
            {
              model: db.icat_files,
              attributes: ["fileid",
            "uid",
            "name",
            "defaultName",
            "extName",
            "type",
            "size",
            "path",
            "pathZip",
            "isSystem",
            "timestamp"]
            },
            db.icat_tags,
            db.icat_happens,
            {
              model: db.icat_users_extend,
              attributes: ["uid",
            "user",
            "name"],
              as: "star_user",
              through: {
                where: {
                  whoUse: "post_user_star"
                }
              }
            },
            {
              model: db.icat_users_extend,
              attributes: ["uid",
            "user",
            "name"],
              as: "love_user",
              through: {
                attributes: [],
                where: {
                  whoUse: "post_user_love"
                }
              }
            }
          ],
          where: {...((que.pid != null) || (req.params.pid != null) ? {
              pid: que.pid != null ? que.pid : req.params.pid
            } : void 0), ...(que.dzTid ? {
              dzTid: que.dzTid // 否则使用linkid查询帖子列表
            } : void 0)}
        }));
      } else {
        tmpInclude = [
          {
            model: db.icat_users_extend,
            include: [
              {
                model: db.icat_goods,
                attributes: ["goodid",
              "name",
              "type",
              "icon",
              "description"],
                include: db.icat_credits
              },
              {
                model: db.icat_vars,
                attributes: ["key",
              "value"],
                where: {
                  key: {
                    [Op.or]: ["christmasHatSwitch"]
                  }
                },
                required: false
              }
            ]
          },
          {
            model: db.icat_files,
            attributes: ["fileid",
          "uid",
          "name",
          "defaultName",
          "extName",
          "type",
          "size",
          "path",
          "pathZip",
          "isSystem",
          "timestamp"]
          },
          db.icat_tags,
          db.icat_happens,
          {
            model: db.icat_users_extend,
            as: "star_user",
            attributes: ["uid",
          "user",
          "name"],
            through: {
              where: {
                whoUse: "post_user_star",
                ...(que.stars === "1" && (auth != null ? auth.uid : void 0) ? {
                  icatUsersExtendUextid: auth.icat_users_extend.uextid
                } : void 0)
              },
              ...(que.stars === "1" && (auth != null ? auth.uid : void 0) ? {
                required: true
              } : void 0)
            }
          },
          {
            model: db.icat_users_extend,
            attributes: ["uid",
          "user",
          "name"],
            as: "love_user",
            through: {
              attributes: [],
              where: {
                whoUse: "post_user_love"
              }
            }
          }
        ];
        tmpWhere = {...(que.linkid != null ? {
            linkid: Number(que.linkid)
          } : void 0), ...(que.word ? {
            title: {
              [Op.like]: `${que.word}`
            }
          } : void 0), ...(que.uid ? {
            uid: Number(que.uid)
          } : void 0), ...(que.isPrivate ? {
            uid: Number(que.isPrivate)
          } : void 0), ...(que.author ? {
            author: Number(que.author)
          } : void 0), ...(que.contentType ? {
            contentType: que.contentType
          } : void 0), ...(que.isTop != null ? {
            isTop: que.isTop
          } : void 0), ...(que.linkChain ? {
            linkChain: {
              [Op.regexp]: que.linkChain
            }
          } : void 0)};
        tmpOrder = [["isTop", "DESC"], ...(!que.order || que.order.toLowerCase() === "asc" ? [] : [["pid", que.order]])];
        tmpLimit = Number(que.limit);
        tmpOffset = Number(que.offset);
        if (que.isRandom) {
          finalPost = (await db.icat_posts.findOne({
            order: [["pid", "DESC"]]
          }));
          allPosts = finalPost ? finalPost.pid : 1;
          pids = [];
          prePosts = [];
          createPids = () => {
            var ref;
            pids = (function() {
              var results = [];
              for (var i = 1, ref = que.limit * 4; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--){ results.push(i); }
              return results;
            }).apply(this).map(() => {
              return Math.floor(Math.random() * allPosts + 1);
            });
            return pids = [...new Set(pids)];
          };
          createPids();
          tmpWhere = {
            ...tmpWhere,
            isPrivate: 0,
            isTop: 0,
            contentType: {
              [Op.or]: ["bbcode", "markdown"]
            },
            isHide: 0,
            pid: {
              [Op.in]: pids
            }
          };
          tmpWhere = {
            [Op.and]: [
              tmpWhere,
              sequelize.where(sequelize.fn("char_length",
              sequelize.col("content")),
              {
                [Op.gt]: 100
              })
            ]
          };
          //tmpLimit = undefined
          tmpOffset = void 0;
          tmpOrder.shift();
        }
        allCountWhere = {...(que.linkid != null ? {
            linkid: Number(que.linkid)
          } : void 0), ...(que.word ? {
            title: {
              [Op.like]: `${que.word}`
            }
          } : void 0), ...(que.uid ? {
            uid: Number(que.uid)
          } : void 0), ...(que.isPrivate ? {
            isPrivate: Number(que.isPrivate)
          } : void 0), ...(que.contentType ? {
            contentType: que.contentType
          } : void 0), ...(que.linkChain ? {
            linkChain: {
              [Op.regexp]: que.linkChain
            }
          } : void 0)};
        if (que.stars && (auth != null ? auth.uid : void 0)) {
          tmp = (await auth.icat_users_extend.getStar_post({
            limit: tmpLimit,
            offset: tmpOffset,
            where: tmpWhere,
            order: tmpOrder,
            include: tmpInclude,
            through: {
              whoUse: "post_user_star"
            }
          }));
          allCount = (await auth.icat_users_extend.countStar_post({
            where: tmpWhere,
            through: {
              whoUse: "post_user_star"
            }
          }));
        } else {
          
          //console.time("帖子列表查询耗时"+JSON.stringify(que))
          tmp = (await db.icat_posts.findAll({
            //attributes:["pid","uid","author","title","content","contentType","likes","linkid","isTop","isGood","isLock","globalTop","blockTop","needCheck","timeDelta","views","linkChain","isPrivate","createTimestamp","updateTimestamp","createTime","finallyTime"]
            //attributes:["pid"]
            include: tmpInclude,
            where: tmpWhere,
            order: tmpOrder,
            limit: tmpLimit,
            offset: tmpOffset
          }));
          
          //用id逐条查询可能比较好？
          /*
          if tmp
            tmp = for tmpPost in tmp 
              await db.icat_posts.findOne
                where:
                  pid:tmpPost.pid
                include:tmpInclude
          */
          /*
          if tmp and que.isRandom
            tmp = tmp.filter (post)=> post.content.length > 100
            tmp = tmp[0..que.limit*1-1]
          */
          //console.timeEnd("帖子列表查询耗时"+JSON.stringify(que))
          if (que.isRandom) {
            allCount = (finalPost != null ? finalPost.pid : void 0) || 0;
          } else {
            allCount = (await db.icat_posts.count({
              where: allCountWhere
            }));
          }
        }
      }
      //额外逻辑 更新操作等
      item = null;
      tmps = [];
      if (tmp) {
        if (tmp.length != null) {
          tmps = tmp;
        } else {
          tmps = [tmp];
        }
      }
      try {
      
        //t = await db.mysql.transaction()
      //console.time("额外操作耗时"+JSON.stringify(que))
        for (i = 0, len = tmps.length; i < len; i++) {
          item = tmps[i];
          await (async(item) => {
            if (Date.now() - item.calcTimestamp > 24 * 3600 * 1000) {
              item.calcTimestamp = Date.now();
              item.replyCalc = (await db.icat_posts.count({
                where: {
                  linkid: item.pid
                }
              }));
            }
            if (item.contentType !== "bbcode") {
              return;
            }
            /*
            if not item.title.match(/[\u4e00-\u9fa5]{3,}/g)
              #console.log "原title",item.title
              cnTitle = item.content.match(/[\u4e00-\u9fa5]{4,}/g)
              if cnTitle
                item.title = cnTitle[0].trim()[0..20]
              else
                item.title = "#{item.author}回复给帖子：#{item.linkid}"
              #console.log "title长度更新":item.title
             */
            return (await item.save());
          })(item);
        }
      } catch (error) {
        //console.timeEnd("额外操作耗时"+JSON.stringify(que))
        /*
        if que.isRandom
          console.log("==↑随机模式==")
        else
          console.log("==↑普通模式==")
        */
        err = error;
        console.log(err);
      }
      output = {
        ok: true,
        msg: "操作成功",
        data: tmp,
        //帖子计数，用于翻页等操作
        allCount: allCount
      };
      // 设置缓存
      if (posts_cacheSwitch) {
        if ((que.pid != null) || (par.pid != null)) {
          await db.icat_cache_pids.create({
            que: que,
            par: par,
            content: output,
            timestamp: Date.now()
          });
        } else {
          if ((que.linkid != null) && !que.uid && !que.contentType && !que.linkChain) {
            await db.icat_cache_linkids.create({
              que: que,
              par: par,
              content: output,
              timestamp: Date.now()
            });
          }
        }
      }
      //output存储完毕后再配置权限
      if (tmp) {
        //阅读权限设置
        if (Object.prototype.toString.call(tmp) === "[object Array]") {
          for (j = 0, len1 = tmp.length; j < len1; j++) {
            thread = tmp[j];
            await readPermFn(thread, {auth, db});
          }
        } else {
          await readPermFn(tmp, {auth, db});
        }
      }
      return output;
    } catch (error) {
      err = error;
      console.log(err);
      return {
        ok: false,
        msg: "服务器内部错误"
      };
    }
  }
};
