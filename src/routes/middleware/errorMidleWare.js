const { ErrorModel } = require("../../db/mysql/models/ErrorModel")

module.exports = async (err, req, res, next) => {
    console.log(err)
    if (!err?.test) {
        try {
            await ErrorModel.create({
                originalUrl: req.originalUrl,
                route: req.route,
                err: { message: err.message, err }
            })
        } catch (e) {
            console.log(e)
        }
    }
    res.status(500).send(typeof err === 'string' ? err : err.message || 'Something went wrong')
}