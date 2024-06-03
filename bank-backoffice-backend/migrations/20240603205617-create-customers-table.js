'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      CustomerNumber: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true
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
        references: {
          model: 'Managers', // Ensure the table name is correct and matches the case
          key: 'ManagerID'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};
