const couchDBConn = require("./conn");


const dbName = process.env.COUCHDB_DB_NAME || 'testdb'

const initCouchDB = async () => new Promise(resolve => {
    couchDBConn.db.create(dbName, function (err) {
        if (err && err.statusCode != 412) {
            console.error(err);
        } else {
            console.log(`CouchDB database ${dbName} is ready!`);
        }
        resolve(true)
    })
})


module.exports = initCouchDB