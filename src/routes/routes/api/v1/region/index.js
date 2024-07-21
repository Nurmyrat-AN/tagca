const { Router } = require("express");
const { mRegion } = require("../../../../../db/mysql/models/region.model");
const { Op, Sequelize } = require("sequelize");
const rRegionGroup = require("./groups");

const rRegion = new Router()

rRegion.use('/group', rRegionGroup)

rRegion.get('/', async (req, res, next) => {
    try {
        const where = [{ [Op.or]: [{ name: { [Op.substring]: req.query.q } }, { subname: { [Op.substring]: req.query.q } }] }, { isGroup: false }]

        res.json(await mRegion.findAll({
            where,
            attributes: {
                include: [
                    [Sequelize.literal(`(SELECT COUNT(regionId) FROM zzz_region_group_conn WHERE groupId='${req.query.groupId}' AND regionId=region.id)`), 'isInGroup']
                ]
            },
            offset: parseInt(req.query.offset || '0'),
            limit: parseInt(req.query.limit || '25'),
        }))
    } catch (e) {
        next(e)
    }
})

rRegion.delete('/:id', async (req, res, next) => {
    try {
        res.json(await mRegion.destroy({ where: { id: req.params.id } }))
    } catch (e) {
        next(e)
    }
})

rRegion.post('/', async (req, res, next) => {
    try {
        res.json((await mRegion.upsert(req.body, { conflictFields: ['id'] }))[0])
    } catch (e) {
        next(e)
    }
})


module.exports = rRegion