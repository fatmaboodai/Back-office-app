'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Managers', 'Email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Managers', 'Email');
  }
};
