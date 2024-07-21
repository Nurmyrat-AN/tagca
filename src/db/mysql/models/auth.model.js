const { DataTypes, Sequelize } = require("sequelize");
const dbSql = require("../config/conn");

const mAuth = dbSql.define('auth', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
})

const mAuthAction = dbSql.define('auth-action', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    authId: DataTypes.STRING,
    token: DataTypes.STRING,
    signedOut: DataTypes.STRING,
    deviceInfo: DataTypes.JSON
})

module.exports = {
    mAuth,
    mAuthAction
}