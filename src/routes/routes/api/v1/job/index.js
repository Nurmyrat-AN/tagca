const { Router } = require("express");
const testError = require("../../../../middleware/testError");
const { Op, Sequelize } = require("sequelize");
const mJob = require("../../../../../db/mysql/models/job.model");
const { SaveImageBase64 } = require("../../../../../utils/image.utils");
const rJobGroup = require("./groups");

const rJob = new Router()

rJob.use('/group', rJobGroup)

rJob.get('/', async (req, res, next) => {
    try {
        res.json(await mJob.findAll({
            where: { [Op.or]: [{ name: { [Op.substring]: req.query.q } }], isGroup: false },
            attributes: {
                include: [
                    [Sequelize.literal(`(SELECT COUNT(jobId) FROM zzz_job_group_conn WHERE groupId='${req.query.groupId}' AND jobId=job.id)`), 'isInGroup']
                ]
            },
            offset: parseInt(req.query.offset || '0'),
            limit: parseInt(req.query.limit || '25'),
        }))
    } catch (e) {
        next(e)
    }
})

rJob.delete('/:id', async (req, res, next) => {
    try {
        res.json(await mJob.destroy({ where: { id: req.params.id } }))
    } catch (e) {
        next(e)
    }
})

rJob.post('/', async (req, res, next) => {
    try {
        req.body.icon = await SaveImageBase64({ img: req.body.icon, folder: `jobs` })
        res.json((await mJob.upsert(req.body, { conflictFields: ['id'] }))[0])
    } catch (e) {
        next(e)
    }
})


module.exports = rJob