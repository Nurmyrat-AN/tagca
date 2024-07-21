const { Router } = require("express");
const mHomeScreenItem = require("../../../../../db/mysql/models/homescreenitem");
const rHomeScreenItem = require("../../../api/v1/homescreenitem");
const { v1 } = require("uuid");
const mJob = require("../../../../../db/mysql/models/job.model");
const { Sequelize } = require("sequelize");
const { randomInt } = require("crypto");

const rHomeitems = new Router()

rHomeitems.get('/', async (req, res, next) => {
    try {
        const offset = parseInt(req.query.offset || "0")
        res.json(await mHomeScreenItem.findAndCountAll({
            include: [{
                association: 'jobs',
                attributes: {
                    include: [[Sequelize.literal(`'${randomInt(1278721)}'`), 'workersCount']]
                }
            }],
            offset: offset,
            order: ['orderNumber'],
            limit: 1
        }))
    } catch (e) {
        next(e)
    }
})

module.exports = rHomeitems