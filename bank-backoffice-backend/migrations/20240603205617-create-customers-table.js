'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      CustomerNumber: {
        type: Sequelize.INTEGER,
        primaryKey: true,   // Ensure CustomerNumber is primary key
        unique: true,       // This should be fine as it is a primary key
        allowNull: false,   // Ensure it's not nullable
        autoIncrement: true // This will make it auto-increment
      },
      CustomerName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      DateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Gender: {
        type: Sequelize.CHAR(1),
        allowNull: false
      },
      ManagerID: {
        type: Sequelize.INTEGER,
        allowNull: true, // This can be nullable or not based on your requirements
        references: {
          model: 'Managers', // Ensure the model name matches the actual table name
          key: 'ManagerID'
        },
        onDelete: 'SET NULL', // You can choose an action when the referenced Manager is deleted
        onUpdate: 'CASCADE'   // This ensures the foreign key updates if the referenced ManagerID changes
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};
