const couchDBConn = require("../config/conn")
const CouchDbSecurity = require("../security")

const dbName = process.env.COUCHDB_DB_NAME || 'hormat'

const readCouchDB = () => {
    
}

module.exports = readCouchDB