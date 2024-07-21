const { Router } = require("express");
const api = require("./api");
const client = require("./clients");

const routes = new Router()

routes.use('/api', api)
routes.use('/client', client)

module.exports = routes