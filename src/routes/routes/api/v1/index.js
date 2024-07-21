const { Router } = require("express");
const rRegion = require("./region");
const rJob = require("./job");
const rHomeScreenItem = require("./homescreenitem");

const v1 = new Router()

v1.use('/regions', rRegion)
v1.use('/jobs', rJob)
v1.use('/homescreenitems', rHomeScreenItem)


module.exports = v1