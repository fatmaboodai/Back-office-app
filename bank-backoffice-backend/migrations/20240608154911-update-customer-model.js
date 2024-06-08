'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Customers', 'CustomerNumber', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false, // Make sure allowNull is set to false if CustomerNumber is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes made in the up function
    await queryInterface.changeColumn('Customers', 'CustomerNumber', {
      type: Sequelize.INTEGER,
      primaryKey: true, // Restore primary key definition if necessary
      autoIncrement: false, // Also restore auto-increment if necessary
      allowNull: false, // Make sure allowNull is set to false if CustomerNumber is required
    });
  }
};
