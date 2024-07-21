const nano = require("nano");

const couchDBConn = nano(process.env.COUCHDB_URL || 'http://127.0.0.1:5984')

module.exports = couchDBConn