const mHomeScreenItem = require("../models/homescreenitem");
const mJob = require("../models/job.model");
const { mRegion } = require("../models/region.model");
const { mWorker } = require("../models/worker.model");
const db = require("./conn")
const mysql = require('mysql2');

const dbName = process.env.DB_NAME || 'testdb'

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    multipleStatements: true
})

const intiMysqlDb = async () => {

    await new Promise((resolve, reject) => {
        connection.query(`
                #DROP DATABASE IF EXISTS \`${dbName}\`;
                CREATE DATABASE IF NOT EXISTS \`${dbName}\`;
            `, (err, value) => {
            if (err) {
                reject(err)
            } else {
                resolve(value)
            }
        })
    })


    connection.on('error', function (err) {
        console.log('db error', err)
    })
    connection.destroy()

    mWorker.belongsToMany(mRegion, { as: 'canWorkingRegions', through: 'zzz_canwork_regions_conn' })
    mWorker.belongsToMany(mJob, { as: 'jobAbilities', through: 'zzz_job_abilities_conn' })
    mHomeScreenItem.belongsToMany(mJob, { as: 'jobs', through: 'zzz_homescreen_jobs_conn' })

    await db.authenticate()
    await db.sync({ alter: true })
    console.log(`Mysql database ${dbName} is ready!`)
}

module.exports = intiMysqlDb