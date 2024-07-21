const { Sequelize, DataTypes } = require("sequelize");
const dbSql = require("../config/conn");

const mJob = dbSql.define('job', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    nameLng: DataTypes.JSON,
    icon: DataTypes.STRING,
    isGroup: { type: DataTypes.BOOLEAN, defaultValue: false }
})

mJob.belongsToMany(mJob, { as: 'jobs', through: 'zzz_job_group_conn', foreignKey: 'groupId' })

module.exports = mJob