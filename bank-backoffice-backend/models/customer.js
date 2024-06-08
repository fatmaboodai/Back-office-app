const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 
const Manager = require('./manager'); // Import the Manager model

const Customer = sequelize.define('Customer', {
    CustomerNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement:true
    },
    CustomerName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        
    },
    DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Gender: {
        type: DataTypes.CHAR(1),
        allowNull: false
    }
}, {
    timestamps: false // Disable automatic timestamps from sequelize package
});

// Define the relationship one-many between the manager and the customer
Customer.belongsTo(Manager, { foreignKey: 'ManagerID' });

module.exports = Customer;
