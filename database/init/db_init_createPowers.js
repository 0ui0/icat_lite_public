// Generated by CoffeeScript 2.6.1
module.exports = async function(db) {
  var createPowerTable, masterArr, postArr;
  masterArr = `权限等级,number
允许访问后台,boolean
允许编辑他人帖子,boolean
允许删除帖子,boolean
允许设置精华,boolean
允许置顶帖子,boolean
最大置顶等级,boolean
允许锁定帖子,boolean
允许移动帖子,boolean
允许复制帖子,boolean
允许编辑标签,boolean
允许编辑用户资料,boolean
允许查看用户IP,boolean
允许禁言,boolean
允许删除用户,boolean
允许审核用户,boolean`.trim().split("\n");
  postArr = `维护访问权限,number
阅读权限,number
允许发表帖子,boolean
允许回复帖子,boolean
允许查看帖子,boolean
允许查看图片,boolean
允许下载附件,boolean
允许上传附件,boolean
当日最大附件上传个数,boolean
附件下载无须积分,boolean
允许删除自己帖子,boolean
允许发送短消息,boolean
当日最大短消息条数,boolean
发帖需要审核,boolean
允许回复锁定帖子,boolean
允许使用at,boolean
单次最多at人数,number
允许使用标签,boolean
单帖最大标签个数,number
发帖后可编辑时限_分钟,number
连续发帖间隔_分钟,number
允许使用签名,boolean
签名最大长度,number`.trim().split("\n");
  
  //#创建权限
  createPowerTable = function(group, arr) {
    var i, item, len, results;
    results = [];
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      results.push((async function(item) {
        item = item.trim().split(",");
        return (await db.icat_powers.findOrCreate({
          where: {
            name: item[0],
            group: group
          },
          defaults: {
            name: item[0],
            group: group,
            type: item[1]
          }
        }));
      })(item));
    }
    return results;
  };
  await createPowerTable("管理", masterArr);
  return (await createPowerTable("帖子", postArr));
};

//授权基本用户组