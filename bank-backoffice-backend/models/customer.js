// const { DataTypes } = require('sequelize');
// const sequelize = require('../database'); 
// const Manager = require('./manager'); // Import the Manager model

// const Customer = sequelize.define('Customer', {
//     CustomerNumber: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         unique: true,
//         autoIncrement:true
//     },
//     CustomerName: {
//         type: DataTypes.STRING(255),
//         allowNull: false,

//     },
//     DateOfBirth: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     Gender: {
//         type: DataTypes.CHAR(1),
//         allowNull: false
//     }
// }, {
//     timestamps: false // Disable automatic timestamps from sequelize package
// });

// // Define the relationship one-many between the manager and the customer
// Customer.belongsTo(Manager, { foreignKey: 'ManagerID' });

// module.exports = Customer;


const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Manager = require('./manager'); // Import the Manager model

const Customer = sequelize.define('Customer', {
    CustomerNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,   // Ensure CustomerNumber is the primary key
        autoIncrement: true, // Auto-increment
        unique: true,       // Ensure it's unique
        allowNull: false    // Make sure it's not null
    },
    CustomerName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Gender: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    ManagerID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Managers',
            key: 'ManagerID'
        },
        onDelete: 'SET NULL', // Optional: behavior when Manager is deleted
        onUpdate: 'CASCADE'   // Optional: cascade updates for ManagerID
    }
}, {
    timestamps: false // Disable automatic timestamps from sequelize package
});

// Define the relationship one-to-many between the manager and the customer
Customer.belongsTo(Manager, { foreignKey: 'ManagerID' });

module.exports = Customer;
