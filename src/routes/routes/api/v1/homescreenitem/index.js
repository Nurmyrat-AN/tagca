const { Router } = require("express");
const mHomeScreenItem = require("../../../../../db/mysql/models/homescreenitem");
const dbSql = require("../../../../../db/mysql/config/conn");
const mJob = require("../../../../../db/mysql/models/job.model");
const { Op } = require("sequelize");

const rHomeScreenItem = new Router()


rHomeScreenItem.get('/', async (req, res, next) => {
    try {
        res.json(await mHomeScreenItem.findAll({
            include: ['jobs'],
            order: ['orderNumber'],
            offset: parseInt(req.query.offset || '0'),
            limit: parseInt(req.query.limit || '25'),
        }))
    } catch (e) {
        next(e)
    }
})

rHomeScreenItem.post('/', async (req, res, next) => {
    try {
        const model = (await mHomeScreenItem.upsert(req.body, { conflictFields: ['id'] }))[0]
        await model.removeJobs()
        const jobs = await mJob.findAll({ where: { id: { [Op.in]: req.body.jobs.map(job => job.id) } } })
        await model.addJobs(jobs)

        res.json(model)
    } catch (e) {
        next(e)
    }
})

module.exports = rHomeScreenItem