const { Router } = require("express");
const testError = require("../../../../../middleware/testError");
const { Op } = require("sequelize");
const { SaveImageBase64 } = require("../../../../../../utils/image.utils");
const mJob = require("../../../../../../db/mysql/models/job.model");

const rJobGroup = new Router()


rJobGroup.get('/', async (req, res, next) => {
    try {
        res.json(await mJob.findAll({
            where: {
                isGroup: true,
                [Op.or]: [{ name: { [Op.substring]: req.query.q } }]
            },
            offset: parseInt(req.query.offset || '0'),
            limit: parseInt(req.query.limit || '25'),
        }))
    } catch (e) {
        next(e)
    }
})

rJobGroup.delete('/:id', async (req, res, next) => {
    try {
        res.json(await mJob.destroy({ where: { id: req.params.id } }))
    } catch (e) {
        next(e)
    }
})



rJobGroup.delete('/:gId/jobs/:rId', async (req, res, next) => {
    try {
        const rGroup = await mJob.findByPk(req.params.gId)
        const job = await mJob.findByPk(req.params.rId)
        res.json(await rGroup.removeJob(job))
    } catch (e) {
        next(e)
    }
})

rJobGroup.post('/', async (req, res, next) => {
    try {
        req.body.icon = await SaveImageBase64({ img: req.body.icon, folder: `jobs` })
        res.json((await mJob.upsert({ ...req.body, isGroup: true }, { conflictFields: ['id'] }))[0])
    } catch (e) {
        next(e)
    }
})


rJobGroup.post('/:id/jobs', async (req, res, next) => {
    try {
        const rGroup = await mJob.findByPk(req.params.id)
        const job = await mJob.findByPk(req.body.id)
        res.json(await rGroup.addJob(job))
    } catch (e) {
        next(e)
    }
})


module.exports = rJobGroup