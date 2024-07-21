const { Router } = require("express");
const v1 = require("./v1");

const client = new Router()

client.use('/v1', v1)

module.exports = client