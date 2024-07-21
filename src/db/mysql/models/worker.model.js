const { DataTypes, Sequelize } = require("sequelize");
const dbSql = require("../config/conn");

const mWorker = dbSql.define('worker', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    about: DataTypes.TEXT,
    icon: DataTypes.STRING,
    address: DataTypes.JSON,
    addressOfService: DataTypes.JSON,
    remoteWorking: DataTypes.BOOLEAN,
})


const extraExperience = {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    startedAt: DataTypes.STRING,
    finishedAt: DataTypes.STRING,
    activeNow: DataTypes.BOOLEAN,
    icon: DataTypes.STRING,
    showToClients: DataTypes.BOOLEAN,
}

const extraImages = {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    src: DataTypes.STRING
}

const mWorkerEducation = dbSql.define('worker-education', extraExperience)
const mWorkerExperience = dbSql.define('worker-experience', extraExperience)
const mWorkerProgress = dbSql.define('worker-progress', extraExperience)
const mWorkerOther = dbSql.define('worker-other', extraExperience)

const mWorkerAlbom = dbSql.define('worker-albom', extraImages)
const mWorkerImage = dbSql.define('worker-image', extraImages)

mWorker.hasMany(mWorkerEducation, { as: 'educations', foreignKey: 'workerId' })
mWorker.hasMany(mWorkerExperience, { as: 'experiences', foreignKey: 'workerId' })
mWorker.hasMany(mWorkerProgress, { as: 'progresses', foreignKey: 'workerId' })
mWorker.hasMany(mWorkerOther, { as: 'others', foreignKey: 'workerId' })
mWorker.hasMany(mWorkerAlbom, { as: 'alboms', foreignKey: 'workerId' })
mWorker.hasMany(mWorkerImage, { as: 'images', foreignKey: 'workerId' })

module.exports = {
    mWorker,
    mWorkerAlbom,
    mWorkerEducation,
    mWorkerExperience,
    mWorkerImage,
    mWorkerOther,
    mWorkerProgress,
}