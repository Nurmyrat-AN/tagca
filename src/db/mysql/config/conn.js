const { Sequelize } = require("sequelize");


const dbSql = new Sequelize(
    process.env.DB_NAME || 'testdb',
    process.env.DB_USER || 'username',
    process.env.DB_PASSWORD || 'password',
    {
        dialect: "mysql",
        host: process.env.DB_HOST || 'localhost',
        logging: false
    }
)

module.exports = dbSql