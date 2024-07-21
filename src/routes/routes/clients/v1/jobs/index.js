const { Router } = require("express");
const mJob = require("../../../../../db/mysql/models/job.model");

const rJob = new Router()

rJob.get('/', async (req, res, next) => {
    try {
        const offset = parseInt(req.query.offset || "0")
        res.json(await mJob.findAndCountAll({
            offset: offset,
            limit: 1
        }))
    } catch (e) {
        next(e)
    }
})

module.exports = rJob