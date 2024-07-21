const { Router } = require("express");
const rHomeitems = require("./homeitems");
const rJob = require("./jobs");
const rRegion = require("./regions");

const v1 = new Router()

v1.use('/items', rHomeitems)
v1.use('/jobs', rJob)
v1.use('/regions', rRegion)

module.exports = v1