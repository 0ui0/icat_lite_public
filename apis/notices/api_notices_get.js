// Generated by CoffeeScript 2.6.1
/*
  @offset 从哪里开始拉取
  @limit 拉取多少条消息
  @asc 顺序，默认倒序
*/
module.exports = {
  method: "get",
  path: "/api/notices/get/{ntceid?}",
  options: {
    validate: {
      params: Joi.object({
        ntceid: Joi.string().pattern(/\d+/)
      }),
      query: Joi.object({
        msgType: Joi.string().default("系统"),
        msgAction: Joi.string(),
        order: Joi.string().default("desc"),
        limit: Joi.string().pattern(/\d+/).default(8),
        offset: Joi.string().pattern(/\d+/).default(0)
      })
    }
  },
  handler: async function(req, h) {
    var allCount, auth, data, db, err, que;
    que = req.query;
    db = req.server.db;
    auth = req.auth.credentials;
    try {
      que.limit = Number(que.limit);
      que.offset = Number(que.offset);
      data = que.ntceid != null ? (await db.icat_notices.findOne({
        where: {
          ntceid: que.ntceid
        }
      })) : (await db.icat_notices.findAll({
        where: {
          receiverId: auth.uid,
          msgType: que.msgType,
          ...(que.msgAction ? {
            msgAction: que.msgAction
          } : void 0)
        },
        order: [["ntceid", que.order]],
        limit: que.limit,
        offset: que.offset
      }));
      allCount = (await db.icat_notices.count({
        where: {
          receiverId: auth.uid,
          msgType: que.msgType,
          ...(que.msgAction ? {
            msgAction: que.msgAction
          } : void 0)
        }
      }));
      return {
        ok: true,
        msg: "拉取消息列表成功",
        data: data,
        allCount: allCount
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
