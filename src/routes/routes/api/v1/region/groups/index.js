const { Router } = require("express");
const testError = require("../../../../../middleware/testError");
const { mRegion } = require("../../../../../../db/mysql/models/region.model");
const { Op } = require("sequelize");
const { SaveImageBase64 } = require("../../../../../../utils/image.utils");

const rRegionGroup = new Router()


rRegionGroup.get('/', async (req, res, next) => {
    try {
        res.json(await mRegion.findAll({
            where: {
                isGroup: true,
                [Op.or]: [{ name: { [Op.substring]: req.query.q } }, { subname: { [Op.substring]: req.query.q } }]
            },
            offset: parseInt(req.query.offset || '0'),
            limit: parseInt(req.query.limit || '25'),
        }))
    } catch (e) {
        next(e)
    }
})

rRegionGroup.delete('/:id', async (req, res, next) => {
    try {
        res.json(await mRegion.destroy({ where: { id: req.params.id } }))
    } catch (e) {
        next(e)
    }
})



rRegionGroup.delete('/:gId/regions/:rId', async (req, res, next) => {
    try {
        const rGroup = await mRegion.findByPk(req.params.gId)
        const region = await mRegion.findByPk(req.params.rId)
        res.json(await rGroup.removeRegion(region))
    } catch (e) {
        next(e)
    }
})

rRegionGroup.post('/', async (req, res, next) => {
    try {
        req.body.icon = await SaveImageBase64({ img: req.body.icon, folder: `regions` })
        res.json((await mRegion.upsert({ ...req.body, isGroup: true }, { conflictFields: ['id'] }))[0])
    } catch (e) {
        next(e)
    }
})


rRegionGroup.post('/:id/regions', async (req, res, next) => {
    try {
        const rGroup = await mRegion.findByPk(req.params.id)
        const region = await mRegion.findByPk(req.body.id)
        res.json(await rGroup.addRegion(region))
    } catch (e) {
        next(e)
    }
})


module.exports = rRegionGroup