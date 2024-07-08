'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'asin');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'asin', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
