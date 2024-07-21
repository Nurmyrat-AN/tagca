require('dotenv').config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const { Server: io } = require('socket.io')
const http = require('http')
const logger = require('morgan');
const errorHandler = require('errorhandler')
const initCouchDB = require('./src/db/couchdb/config/initialize')
const intiMysqlDb = require('./src/db/mysql/config/migrations')
const writeCouchDB = require('./src/db/couchdb/services/writeCouchDB')
const readCouchDB = require('./src/db/couchdb/services/readfromDB')
const mRegion = require('./src/db/mysql/models/region.model')
const mJob = require('./src/db/mysql/models/job.model')
const { mAuth } = require('./src/db/mysql/models/auth.model')
const { mWorker } = require('./src/db/mysql/models/worker.model')
const routes = require('./src/routes/routes')
const errorhandler = require('errorhandler');
const errorMidleWare = require('./src/routes/middleware/errorMidleWare')
const mHomeScreenItem = require('./src/db/mysql/models/homescreenitem')

const app = express()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    maxAge: 50000,
    credentials: true,
    methods: ['PUT', 'POST', 'GET', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Access-Control-Allow-Origin',
        'Origin',
        'lng',
    ],
    header: {
        'Content-Type': 'application/json, text/plain, text/html'
    }
}

const server = http.createServer(app)
const socket = new io(server, {
    cors: corsOptions,
    cookie: true
})

app.use(logger('dev'));
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
// app.use(express.static(path.resolve(process.env.PUBLIC_DIRECTORY || __dirname)))
app.use(express.static(path.resolve(`${__dirname}/../`)))
app.use(fileUpload({}))
app.use(cookieParser())
app.use('/', routes)
app.use(errorMidleWare)
errorhandler.title = "Ups...";
app.use(errorhandler());

const PORT = process.env.PORT || 2000

const startServer = async () => {

    await initCouchDB()
    await intiMysqlDb()

    const items = await mHomeScreenItem.findAll({ include: ['jobs'] })
    while (items.length > 0) {
        const item = items.shift()
        if (item.jobs.length < 15) {
            const jobs = await mJob.findAll({ limit: 15 })
            await item.addJob(jobs)
        }
    }

    app.use(errorHandler());

    server.listen(PORT, () => {
        console.log(`Node app is running on port ${PORT}`)
    })

    server.on('uncaughtException', err => {
        console.log('something terrible happened..', err)
    })

    socket.on('connection', socket => {
        console.log(`Connected user: ${socket.id}`)
    })
}

startServer()