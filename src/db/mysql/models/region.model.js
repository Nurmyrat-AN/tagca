const { DataTypes, Sequelize } = require("sequelize");
const dbSql = require("../config/conn");

const mRegion = dbSql.define('region', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    nameLng: DataTypes.JSON,
    subname: DataTypes.STRING,
    subnameLng: DataTypes.JSON,
    coordinates: DataTypes.JSON,
    icon: DataTypes.STRING,
    isGroup: { type: DataTypes.BOOLEAN, defaultValue: false }
})

mRegion.belongsToMany(mRegion, { as: 'regions', through: 'zzz_region_group_conn', foreignKey: 'groupId' })

module.exports = { mRegion }