// Generated by CoffeeScript 2.6.1
var createAPI, setPayload;

createAPI = require("../../tools/api/createAPI");

setPayload = {
  creditid: Joi.number(),
  name: Joi.string().required(),
  unit: Joi.string().min(1).max(5).allow(""),
  rate: Joi.number(),
  isUse: Joi.number()
};

module.exports = createAPI("credit", {
  cnName: "积分",
  setPayload: setPayload,
  setFields: Object.keys(setPayload)
}).set;