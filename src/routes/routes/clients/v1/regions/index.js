const { Router } = require("express");
const { mRegion } = require("../../../../../db/mysql/models/region.model");
const { Op } = require("sequelize");

const rRegion = new Router()

rRegion.get('/', async (req, res, next) => {
    try {
        const offset = parseInt(req.query.offset || "0")
        res.json(await mRegion.findAndCountAll({
            where: {
                name: { [Op.substring]: `%${req.query.query}%` }
            },
            offset: offset,
            limit: 1
        }))
    } catch (e) {
        next(e)
    }
})

module.exports = rRegion