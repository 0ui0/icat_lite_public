// Generated by CoffeeScript 2.6.1
//index = require "./index"
module.exports = {
  path: "/index.html", //pid linkid limit offset count
  method: "get",
  options: {
    auth: false
  },
  //handler: index.bind @
  handler: async function(req, h) {
    var err, html;
    try {
      html = (await req.server.inject({
        url: "/lite"
      }));
      return html.result;
    } catch (error) {
      err = error;
      return console.log(err);
    }
  }
};
