const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Manager = sequelize.define('Manager', {
    ManagerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ManagerName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false // Disable automatic timestamps from sequelize package
});

module.exports = Manager;