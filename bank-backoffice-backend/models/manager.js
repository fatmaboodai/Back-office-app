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
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, // or use TEXT if needed
        allowNull: false
    }
}, {
    timestamps: false // Disable automatic timestamps from sequelize package
});

module.exports = Manager;
