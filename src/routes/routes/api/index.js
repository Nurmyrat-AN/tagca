const { Router } = require("express");
const v1 = require("./v1");

const api = new Router()

api.use('/v1', v1)

module.exports = api