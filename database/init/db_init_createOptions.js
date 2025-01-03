// Generated by CoffeeScript 2.6.1
module.exports = async function(db) {
  /*
  await db.icat_options.sync 
    force:true
  */
  var fnToStr;
  fnToStr = function(fn) {
    var str;
    str = String(fn);
    return str;
  };
  await db.icat_options.findOrCreate({
    where: {
      key: "global_siteName"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_siteName",
      name: "站点名称",
      type: "string",
      value: "新站点 | 喵空间社区程序",
      joi: fnToStr(function() {
        return Joi.string().allow('').min(1).max(100);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_siteBaseName"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_siteBaseName",
      name: "站点简称",
      type: "string",
      value: "新站点",
      joi: fnToStr(function() {
        return Joi.string().allow('').min(1).max(100);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_siteDescription"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_siteDescription",
      name: "站点描述",
      type: "text",
      value: "你的站点描述，用于SEO的description",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_siteKeywords"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_siteKeywords",
      name: "站点关键词",
      description: "用英文逗号隔开",
      type: "string",
      value: "喵空间,社区",
      joi: fnToStr(function() {
        return Joi.string().allow('').pattern(/^(.+,.+)+$/);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_siteUrl"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_siteUrl",
      type: "string",
      name: "站点地址",
      value: "yoursite.com",
      description: "不带http或https",
      joi: fnToStr(function() {
        return Joi.string().allow('').hostname();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_masterMail"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_masterMail",
      type: "string",
      name: "管理邮箱",
      value: "admin@yoursite.com",
      joi: fnToStr(function() {
        return Joi.string().allow('').email();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_icp"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_icp",
      type: "string",
      name: "备案信息",
      value: "XICP备xxxxxxxx号",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_door"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_door",
      type: "number",
      name: "大门状态",
      value: 1, //1完全开放、2内部开放、3完全关闭
      description: "1完全开放，2内部开放，3完全关闭",
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_doorCloseReason"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_doorCloseReason",
      type: "number",
      name: "大门关闭原因",
      value: "关站了呜呜呜o(╯□╰)o", //1完全开放、2内部开放、3完全关闭
      joi: fnToStr(function() {
        return Joi.string();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_theme"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "站点信息",
      key: "global_theme",
      type: "number",
      name: "主题风格",
      description: "1黄色，2蓝色，其它颜色请关注版本更新",
      value: 1,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  /*
  await db.icat_options.findOrCreate
    where:
      key:"global_reasons"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"全局参数"
      key:"global_reasons"
      name:"备选操作原因"
      type:"array"
      joi:fnToStr ->
        Joi.array()
      value:"""
        [水].删.回复小于5个汉字
        [水].删
        [水].警.扣-xx灵石
        [重].删
        [离].删
        [队形].超.删
        [刷楼].超.删
        [刷帖].超.警.扣-20灵石
        [刷版].删
        [刷版].警
        [广].删	
        [恶意].删.禁-X天	
        [恶性].删.闭-Y天
        [头像].删
        [过失].冻
      """.trim().split("\n")
  */
  await db.icat_options.findOrCreate({
    where: {
      key: "global_headCode"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "全局参数",
      key: "global_headCode",
      type: "string",
      name: "其它头部代码",
      description: "头部代码，用于后端初始页面的启动渲染，不会添加到前端的SPA页面",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_footCode"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "全局参数",
      key: "global_footCode",
      type: "string",
      name: "其它尾部代码",
      description: "尾部代码，用于后端初始页面的启动渲染，不会添加到前端的SPA页面",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_notice"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "全局参数",
      key: "global_notice",
      type: "string",
      name: "站点公告",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_friendLinks"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "全局参数",
      key: "global_friendLinks",
      type: "array",
      name: "友情链接",
      description: "使用自动表单功能添加友情链接，注意仿照范例格式，并根据提交的错误提示修改",
      value: [
        {
          order: 0,
          name: "喵宅苑",
          url: "/",
          img: ""
        }
      ],
      joi: fnToStr(function() {
        return Joi.array().items(Joi.object({
          order: Joi.number().required(),
          name: Joi.string().required(),
          url: Joi.string().required(),
          img: Joi.string().allow("").required()
        }));
      })
    }
  });
  /*
  await db.icat_options.findOrCreate
    where:
      key:"global_firewallSwitch"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"防火墙"
      key:"global_firewallSwitch"
      type:"number"
      name:"防火墙开关"
      description:"简易的验证防火墙，会拦截全部的请求，根据需要启用"
      value:1
      joi:fnToStr ->
        Joi.number().strict().valid(0,1)

  await db.icat_options.findOrCreate
    where:
      key:"global_firewallAllowSpider"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"防火墙"
      key:"global_firewallAllowSpider"
      type:"number"
      name:"放行爬虫"
      description:"配置防火墙是否放行常用搜索引擎爬虫"
      value:1
      joi:fnToStr ->
        Joi.number().strict().valid(0,1)

  await db.icat_options.findOrCreate
    where:
      key:"global_firewallAllowUser"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"防火墙"
      key:"global_firewallAllowUser"
      type:"number"
      name:"放行注册用户"
      value:1
      joi:fnToStr ->
        Joi.number().strict().valid(0,1)

  await db.icat_options.findOrCreate
    where:
      key:"global_firewallAllowTimeDelta"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"防火墙"
      key:"global_firewallAllowTimeDelta"
      type:"number"
      name:"放行时间间隔/分钟（多久将销毁信任列表）"
      description:"多久将销毁信任列表，销毁后需要重新验证"
      value:10
      joi:fnToStr ->
        Joi.number().strict().min(0.5)

  await db.icat_options.findOrCreate
    where:
      key:"global_firewallMode"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"防火墙"
      key:"global_firewallMode"
      type:"number"
      name:"放行模式（1黑名单模式，2白名单模式）"
      description:"1黑名单模式，2白名单模式"
      value:1
      joi:fnToStr ->
        Joi.number().strict().valid(1,2)

  await db.icat_options.findOrCreate
    where:
      key:"global_firewallRefuseIpList"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"防火墙"
      key:"global_firewallRefuseIpList"
      type:"array"
      name:"拒绝IP名单（正则表达式）"
      description:"使用自动表单添加，注意正则表达式格式，省略//和g"
      value:[]
      joi:fnToStr ->
        Joi.array().items(Joi.string())

  await db.icat_options.findOrCreate
    where:
      key:"global_firewallAllowIpList"
    defaults:
      group1:"全局"
      group2:"站点设置"
      group3:"防火墙"
      key:"global_firewallAllowIpList"
      type:"array"
      name:"允许IP名单（正则表达式）"
      description:"使用自动表单添加，注意正则表达式格式，省略//和g"
      value:[]
      joi:fnToStr ->
        Joi.array().items(Joi.string())

  */
  await db.icat_options.findOrCreate({
    where: {
      key: "global_styleLogoLight"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "主题配置",
      key: "global_styleLogoLight",
      type: "string",
      name: "亮色logo",
      value: "",
      joi: fnToStr(function() {
        return Joi.string();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "global_styleLogoDark"
    },
    defaults: {
      group1: "全局",
      group2: "站点设置",
      group3: "主题配置",
      key: "global_styleLogoDark",
      type: "string",
      name: "暗色logo",
      value: "",
      joi: fnToStr(function() {
        return Joi.string();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_pause"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "number",
      key: "join_pause",
      name: "暂停注册",
      value: 0, //开放注册、邀请注册、关闭注册
      description: "1暂停注册，0允许注册",
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_pauseMessage"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "number",
      key: "join_pauseMessage",
      name: "暂停注册提示信息",
      value: "喵，暂停注册了噢~",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_agreement"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "text",
      key: "join_agreement",
      name: "注册协议",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      }),
      value: `当您申请用户时，表示您已经同意遵守本规章。 欢迎您加入本站点参加交流和讨论，本站点为公共论坛，为维护网上公共秩序和社会稳定，请您自觉遵守以下条款： 
一、不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息： 
（一）煽动抗拒、破坏宪法和法律、行政法规实施的；
（二）煽动颠覆国家政权，推翻社会主义制度的；
（三）煽动分裂国家、破坏国家统一的；
（四）煽动民族仇恨、民族歧视，破坏民族团结的；
（五）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；
（六）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；
（七）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；
（八）损害国家机关信誉的；
（九）其他违反宪法和法律行政法规的；
（十）进行商业广告行为的。
二、互相尊重，对自己的言论和行为负责。
三、禁止在申请用户时使用相关本站的词汇，或是带有侮辱、毁谤、造谣类的或是有其含义的各种语言进行注册用户，否则我们会将其删除。
四、禁止以任何方式对本站进行各种破坏行为。
五、如果您有违反国家相关法律法规的行为，本站概不负责，您的登录论坛信息均被记录无疑，必要时，我们会向相关的国家管理部门提供此类信息。 `
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_sameIPLimit"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "number",
      key: "join_sameIPLimit",
      name: "同一IP重复注册限制（小时）",
      value: 24,
      joi: fnToStr(function() {
        return Joi.number().strict().min(1);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_review"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "number",
      key: "join_review",
      name: "新用户注册审核",
      value: 0, //是 否
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  /*

  await db.icat_options.findOrCreate
    where:
      key:"join_mailActive"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"注册设置"
      type:"number"
      key:"join_mailActive"
      name:"新用户邮件激活"
      value:0 #是 否  
      joi:fnToStr ->
        Joi.number().strict().valid(0,1)

  await db.icat_options.findOrCreate
    where:
      key:"join_mailActiveTitle"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"注册设置"
      type:"string"
      key:"join_mailActiveTitle"
      name:"激活邮件标题"
      value:"来自{sitename}的注册激活邮件"
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"join_mailActiveContent"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"注册设置"
      type:"text"
      key:"join_mailActiveContent"
      name:"激活邮件内容"
      joi:fnToStr ->
        Joi.string().allow('')
      value:"""
        尊敬的{username}，
        <br/>欢迎你注册成为{sitename}的会员！
        <br/>请点击下面的链接进行帐号的激活：
        <br/>{url}
        <br/>如果不能点击链接，请复制到浏览器地址输入框访问。
        <br/>
        <br/>{sitename}
        <br/>{time}
      """

  await db.icat_options.findOrCreate
    where:
      key:"join_sendWelcome"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"注册设置"
      type:"number"
      key:"join_sendWelcome"
      name:"发送欢迎信息"
      value:0 #是 否
      joi:fnToStr ->
        Joi.number().strict().valid(0,1)

  await db.icat_options.findOrCreate
    where:
      key:"join_welcomeTitle"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"注册设置"
      type:"string"
      key:"join_welcomeTitle"
      name:"欢迎信息标题"
      value:"""
        欢迎你注册成为{sitename}的会员
      """
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"join_welcomeContent"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"注册设置"
      type:"text"
      key:"join_welcomeContent"
      name:"欢迎信息内容"
      joi:fnToStr ->
        Joi.string().allow('')
      value:"""
        尊敬的{username}，
        <br/>欢迎你注册成为{sitename}的会员！
        <br/>
        <br/>本站全体管理人员向您问好！
        <br/>{sitename}
      """

  */
  await db.icat_options.findOrCreate({
    where: {
      key: "join_avoidUserName"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "array",
      key: "join_avoidUserName",
      name: "禁止注册用户名",
      value: ["admin", "管理员", "版主", "master", "创始人", "斑竹"],
      joi: fnToStr(function() {
        return Joi.array().items(Joi.string().allow(''));
      })
    }
  });
  //敏感词库？
  await db.icat_options.findOrCreate({
    where: {
      key: "join_userNameLength"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "range",
      key: "join_userNameLength",
      name: "用户名长度控制",
      value: [
        2,
        15 //数学区间
      ],
      description: "数学区间[最小值,最大值]，使用自动表单",
      joi: fnToStr(function() {
        return Joi.array().items(Joi.number().strict()).length(2);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_passwordLength"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "range",
      key: "join_passwordLength",
      name: "密码长度控制",
      description: "数学区间[最小值,最大值]，使用自动表单",
      value: [
        2,
        15 //数学区间
      ],
      joi: fnToStr(function() {
        return Joi.array().items(Joi.number().strict()).length(2);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_passwordComplex"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "注册设置",
      type: "object",
      key: "join_passwordComplex",
      name: "密码复杂度",
      description: "自动表单，分别是：小写字母、大写字母、数字、符号、避免和用户名相同；0关闭，1开启",
      joi: fnToStr(function() {
        return Joi.object({
          lowercase: Joi.number().strict().valid(0, 1),
          uppercase: Joi.number().strict().valid(0, 1),
          number: Joi.number().strict().valid(0, 1),
          sign: Joi.number().strict().valid(0, 1),
          avoidUserName: Joi.number().strict().valid(0, 1)
        });
      }),
      value: {
        lowercase: 1,
        uppercase: 1,
        number: 1,
        sign: 1,
        avoidUserName: 1
      }
    }
  });
  /*
  """
  小写字母|是
  大写字母|是
  数字|是
  符号|是
  禁止用户名作为密码|是
  """
  */
  await db.icat_options.findOrCreate({
    where: {
      key: "join_passwordTryTime"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "登录设置",
      type: "number",
      key: "join_passwordTryTime",
      name: "密码尝试次数",
      value: 5,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "join_passwordRetryCooldown"
    },
    defaults: {
      group1: "全局",
      group2: "注册登录",
      group3: "登录设置",
      type: "number",
      key: "join_passwordRetryCooldown",
      name: "密码错误重试冷却时间（分钟）",
      value: 5,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  /*

  await db.icat_options.findOrCreate
    where:
      key:"join_passwordResetMailTitle"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"登录设置"
      type:"string"
      key:"join_passwordResetMailTitle"
      name:"密码重置邮件标题"
      value:"{username}您好，这是{sitename}发送给您的密码重置邮件"
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"join_passwordResetMailContent"
    defaults:
      group1:"全局"
      group2:"注册登录"
      group3:"登录设置"
      type:"text"
      key:"join_passwordResetMailContent"
      name:"密码重置邮件内容"
      joi:fnToStr ->
        Joi.string().allow('')
      value:"""
        尊敬的{username}，这是来自{sitename}的密码重置邮件。
        点击下面的链接重置您的密码：<br/>
        {url}<br/>
        如果链接无法点击，请将链接粘贴到浏览器的地址栏中访问。<br/>
        {sitename} <br/>
        {time}
      """

  */
  await db.icat_options.findOrCreate({
    where: {
      key: "attachments_size"
    },
    defaults: {
      group1: "全局",
      group2: "附件相关",
      group3: "附件设置",
      type: "object",
      key: "attachments_size",
      name: "附件类型和尺寸限制(KB)",
      description: "使用自动表单",
      joi: fnToStr(function() {
        return Joi.object({
          jpg: Joi.number().strict(),
          jpeg: Joi.number().strict(),
          gif: Joi.number().strict(),
          png: Joi.number().strict(),
          bmp: Joi.number().strict(),
          xls: Joi.number().strict(),
          txt: Joi.number().strict(),
          doc: Joi.number().strict(),
          docx: Joi.number().strict(),
          zip: Joi.number().strict(),
          '7z': Joi.number().strict(),
          tar: Joi.number().strict(),
          pdf: Joi.number().strict(),
          mp4: Joi.number().strict(),
          mpeg: Joi.number().strict(),
          flv: Joi.number().strict(),
          mov: Joi.number().strict(),
          wmv: Joi.number().strict(),
          webm: Joi.number().strict(),
          midi: Joi.number().strict(),
          ogg: Joi.number().strict(),
          mp3: Joi.number().strict()
        });
      }),
      value: {
        jpg: 1024 * 5,
        jpeg: 1024 * 5,
        gif: 1024 * 5,
        png: 1024 * 5,
        bmp: 1024 * 5,
        xls: 2048,
        txt: 2048,
        doc: 2048,
        docx: 2048,
        zip: 2048,
        "7z": 1024 * 5,
        tar: 1024 * 5,
        pdf: 1024 * 5,
        mp4: 1024 * 10,
        mpeg: 1024 * 10,
        flv: 1024 * 10,
        mov: 1024 * 10,
        wmv: 1024 * 10,
        webm: 1024 * 10,
        midi: 1024 * 5,
        ogg: 1024 * 5,
        mp3: 1024 * 5
      }
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "attachments_uploadLimit"
    },
    defaults: {
      group1: "全局",
      group2: "附件相关",
      group3: "附件设置",
      type: "number",
      key: "attachments_uploadLimit",
      name: "单次附件上传个数限制",
      value: 10,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "attachments_ImageThumbSize"
    },
    defaults: {
      group1: "全局",
      group2: "附件相关",
      group3: "图片设置",
      type: "array",
      key: "attachments_ImageThumbSize",
      name: "超过尺寸缩略(宽x高)",
      value: [780, "auto"],
      description: "使用自动表单，允许的值：数字或者auto",
      joi: fnToStr(function() {
        return Joi.array().items(Joi.number().strict(), Joi.string().allow(''));
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "attachments_ImageThumbQuality"
    },
    defaults: {
      group1: "全局",
      group2: "附件相关",
      group3: "图片设置",
      type: "number",
      key: "attachments_ImageThumbQuality",
      name: "缩略质量",
      value: 100,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  //帖子相关
  await db.icat_options.findOrCreate({
    where: {
      key: "posts_wordsLimit"
    },
    defaults: {
      group1: "全局",
      group2: "帖子相关",
      group3: "发帖设置",
      type: "range",
      key: "posts_wordsLimit",
      name: "字数限制",
      value: [1, 20000],
      description: "数学区间[最小值,最大值]，使用自动表单",
      joi: fnToStr(function() {
        return Joi.array().items(Joi.number().strict()).length(2);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "posts_allowSubmit"
    },
    defaults: {
      group1: "全局",
      group2: "帖子相关",
      group3: "发帖设置",
      type: "number",
      key: "posts_allowSubmit",
      name: "全局发帖开关",
      value: 1,
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "posts_titleLimit"
    },
    defaults: {
      group1: "全局",
      group2: "帖子相关",
      group3: "发帖设置",
      type: "number",
      key: "posts_titleLimit",
      name: "标题最大长度",
      value: 50,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "posts_cacheSwitch"
    },
    defaults: {
      group1: "全局",
      group2: "帖子相关",
      group3: "缓存设置",
      type: "number",
      key: "posts_cacheSwitch",
      name: "帖子缓存开关",
      value: 1,
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "posts_cacheTime"
    },
    defaults: {
      group1: "全局",
      group2: "帖子相关",
      group3: "缓存设置",
      type: "number",
      key: "posts_cacheTime",
      name: "查询缓存时间（毫秒）",
      value: 5 * 60 * 1000, //5分钟
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "email_switch"
    },
    defaults: {
      group1: "全局",
      group2: "电子邮件",
      group3: "邮件设置",
      type: "number",
      key: "email_switch",
      name: "邮件开关",
      value: 0,
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "email_smtpServer"
    },
    defaults: {
      group1: "全局",
      group2: "电子邮件",
      group3: "邮件设置",
      type: "string",
      key: "email_smtpServer",
      name: "SMTP服务器",
      value: "smtp.exmail.qq.com",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "email_smtpPort"
    },
    defaults: {
      group1: "全局",
      group2: "电子邮件",
      group3: "邮件设置",
      type: "number",
      key: "email_smtpPort",
      name: "SMTP端口",
      value: 465,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "email_senderMail"
    },
    defaults: {
      group1: "全局",
      group2: "电子邮件",
      group3: "邮件设置",
      type: "string",
      key: "email_senderMail",
      name: "发信人地址",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('').email();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "email_valid"
    },
    defaults: {
      group1: "全局",
      group2: "电子邮件",
      group3: "邮件设置",
      type: "number",
      key: "email_valid",
      name: "SMTP用户身份验证",
      value: 0,
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "email_userName"
    },
    defaults: {
      group1: "全局",
      group2: "电子邮件",
      group3: "邮件设置",
      type: "string",
      key: "email_userName",
      name: "验证用户名",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "email_password"
    },
    defaults: {
      group1: "全局",
      group2: "电子邮件",
      group3: "邮件设置",
      type: "string",
      key: "email_password",
      name: "验证密码",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  /*
  await db.icat_options.findOrCreate
    where:
      key:"email_checkSender"
    defaults:
      group1:"全局"
      group2:"电子邮件"
      group3:"邮件检测"
      type:"string"
      key:"email_checkSender"
      name:"发件人地址"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"email_checkRecever"
    defaults:
      group1:"全局"
      group2:"电子邮件"
      group3:"邮件检测"
      type:"string"
      key:"email_checkRecever"
      name:"收件人地址"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"email_checkContent"
    defaults:
      group1:"全局"
      group2:"电子邮件"
      group3:"邮件检测"
      type:"string"
      key:"email_checkContent"
      name:"邮件内容"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  */
  //电子商务
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_creditid"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付设置",
      type: "string",
      key: "pay_creditid",
      name: "交易积分id",
      value: 4,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_rate"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付设置",
      type: "string",
      key: "pay_rate",
      name: "积分兑换比率",
      description: "积分和人民币的兑换比率，默认值10，即1人民币等于10积分",
      value: 10,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_minValue"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付设置",
      type: "number",
      key: "pay_minValue",
      name: "单次购买最小积分数额",
      value: 50,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_maxValue"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付设置",
      type: "number",
      key: "pay_maxValue",
      name: "单次购买最大积分数额",
      value: 1000,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_aliSwitch"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付宝",
      type: "number",
      key: "pay_aliSwitch",
      name: "支付宝支付开关",
      value: 1,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_aliMode"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付宝",
      type: "number",
      key: "pay_aliMode",
      name: "支付模式",
      value: 1, //1普通公钥模式 2公钥证书模式
      description: "1普通公钥模式 2公钥证书模式",
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_aliAppid"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付宝",
      type: "string",
      key: "pay_aliAppid",
      name: "应用ID",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_aliMode1DeveloperPrivateKeyFile"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付宝",
      type: "string",
      key: "pay_aliMode1DeveloperPrivateKeyFile",
      name: "模式1 RSA2(SHA256)开发者私钥文件",
      value: "alipay_private.key",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "pay_aliMode1ZfbPublicKeyFile"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "支付宝",
      type: "string",
      key: "pay_aliMode1ZfbPublicKeyFile",
      name: "模式1 RSA2(SHA256)支付宝公钥文件",
      value: "alipay_public.key",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  /*

  await db.icat_options.findOrCreate
    where:
      key:"pay_aliMode2DeveloperPrivateKeyFile"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"支付宝"
      type:"string"
      key:"pay_aliMode2DeveloperPrivateKeyFile"
      name:"模式2 RSA2(SHA256)开发者私钥文件"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_aliMode2ZfbPublicKeyCrtFile"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"支付宝"
      type:"string"
      key:"pay_aliMode2ZfbPublicKeyCrtFile"
      name:"模式2 RSA2(SHA256)支付宝公钥证书文件"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_aliMode2AppPublicKeyCrtFile"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"支付宝"
      type:"string"
      key:"pay_aliMode2AppPublicKeyCrtFile"
      name:"模式2 RSA2(SHA256)应用公钥证书文件"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_aliMode2ZfbRootKeyCrtFile"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"支付宝"
      type:"string"
      key:"pay_aliMode2ZfbRootKeyCrtFile"
      name:"模式2 RSA2(SHA256)支付宝根证书文件"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')
  */
  //qq钱包
  /*
  await db.icat_options.findOrCreate
    where:
      key:"pay_qqSwitch"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"number"
      key:"pay_qqSwitch"
      name:"QQ钱包支付开关"
      value:1
      joi:fnToStr ->
        Joi.number().strict()

  await db.icat_options.findOrCreate
    where:
      key:"pay_qqJSAPI"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"number"
      key:"pay_qqJSAPI"
      name:"JSAPI开关"
      value:1
      joi:fnToStr ->
        Joi.number().strict()

  await db.icat_options.findOrCreate
    where:
      key:"pay_qqAppid"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"string"
      key:"pay_qqAppid"
      name:"（可选）应用ID"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_qqMchid"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"string"
      key:"pay_qqMchid"
      name:"商户号"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_qqOperatorid"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"string"
      key:"pay_qqOperatorid"
      name:"（可选）操作员账号"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_qqOperatorPassword"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"string"
      key:"pay_qqOperatorPassword"
      name:"（可选）操作员密码md5"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_qqAPIkey"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"string"
      key:"pay_qqAPIkey"
      name:"API秘钥"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')

  await db.icat_options.findOrCreate
    where:
      key:"pay_qqPayRootCrtFile"
    defaults:
      group1:"全局"
      group2:"电子商务"
      group3:"QQ钱包"
      type:"string"
      key:"pay_qqPayRootCrtFile"
      name:"（可选）支付根证书文件 退款用"
      value:""
      joi:fnToStr ->
        Joi.string().allow('')
  */
  await db.icat_options.findOrCreate({
    where: {
      key: "shop_notice"
    },
    defaults: {
      group1: "全局",
      group2: "电子商务",
      group3: "商城设置",
      type: "string",
      key: "shop_notice",
      name: "商店公告",
      value: "",
      joi: fnToStr(function() {
        return Joi.string().allow('');
      })
    }
  });
  //积分设置
  await db.icat_options.findOrCreate({
    where: {
      key: "credit_basicCreditid"
    },
    defaults: {
      group1: "全局",
      group2: "积分设置",
      group3: "积分设置",
      type: "number",
      key: "credit_basicCreditid",
      name: "基本积分id",
      value: 1,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "credit_expCreditid"
    },
    defaults: {
      group1: "全局",
      group2: "积分设置",
      group3: "积分设置",
      type: "number",
      key: "credit_expCreditid",
      name: "经验积分id（用户组关联）",
      value: 3,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "credit_worldLevelCreditid"
    },
    defaults: {
      group1: "全局",
      group2: "积分设置",
      group3: "积分设置",
      type: "number",
      key: "credit_worldLevelCreditid",
      name: "世界等级积分id",
      value: 19,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  
  //爬虫设置
  await db.icat_options.findOrCreate({
    where: {
      key: "spider_rssSwitch"
    },
    defaults: {
      group1: "全局",
      group2: "爬虫设置",
      group3: "RSS爬虫",
      type: "number",
      key: "spider_rssSwitch",
      name: "爬虫开关",
      value: 0,
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "spider_rssCycleTime"
    },
    defaults: {
      group1: "全局",
      group2: "爬虫设置",
      group3: "RSS爬虫",
      type: "number",
      key: "spider_rssCycleTime",
      name: "爬虫间隔时间（分钟）",
      value: 24 * 60 * 60,
      joi: fnToStr(function() {
        return Joi.number().strict();
      })
    }
  });
  await db.icat_options.findOrCreate({
    where: {
      key: "spider_rssDebug"
    },
    defaults: {
      group1: "全局",
      group2: "爬虫设置",
      group3: "RSS爬虫",
      type: "number",
      key: "spider_rssDebug",
      name: "调试模式",
      value: 1,
      joi: fnToStr(function() {
        return Joi.number().strict().valid(0, 1);
      })
    }
  });
  return (await db.icat_options.findOrCreate({
    where: {
      key: "spider_rssSource"
    },
    defaults: {
      group1: "全局",
      group2: "爬虫设置",
      group3: "RSS爬虫",
      type: "number",
      key: "spider_rssSource",
      name: "爬虫数据源",
      value: [
        {
          name: "测试数据源1",
          url: "https://test.com",
          uid: 1,
          linkid: 0
        },
        {
          name: "测试数据源2",
          url: "https://test.com",
          uid: 1,
          linkid: 0
        }
      ],
      joi: fnToStr(function() {
        return Joi.array().items(Joi.object({
          name: Joi.string().required(),
          url: Joi.string().required(),
          uid: Joi.number().min(1).required(),
          linkid: Joi.number().min(0).required()
        }));
      })
    }
  }));
};
