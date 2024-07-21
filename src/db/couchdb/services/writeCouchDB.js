const couchDBConn = require("../config/conn")
const CouchDbSecurity = require("../security")

const dbName = process.env.COUCHDB_DB_NAME || 'testdb'

const writeCouchDB = (data, cb) => couchDBConn.use(dbName).insert(CouchDbSecurity.encode(data), cb)

module.exports = writeCouchDB