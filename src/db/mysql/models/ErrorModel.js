const { DataTypes } = require('sequelize')
const dbSql = require('../config/conn')

const ErrorModel = dbSql.define('_errors', {
    originalUrl: DataTypes.STRING,
    route: DataTypes.JSON,
    err: DataTypes.JSON
})

module.exports = { ErrorModel }