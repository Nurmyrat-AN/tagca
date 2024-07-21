const { Sequelize, DataTypes } = require("sequelize");
const dbSql = require("../config/conn");

const mHomeScreenItem = dbSql.define('homescreenitem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    nameLng: DataTypes.JSON,
    style: DataTypes.ENUM('horizontal_scroll', 'simple_text', 'simple_card'),
    orderNumber: {type: DataTypes.INTEGER, defaultValue: 0},
})


module.exports = mHomeScreenItem