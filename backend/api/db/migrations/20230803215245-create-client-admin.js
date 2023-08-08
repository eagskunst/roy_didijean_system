'use strict';

const { ADMIN_TABLE, AdminSchema } = require('../models/admin.model');
const { CLIENT_TABLE, ClientSchema } = require('../models/client.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(ADMIN_TABLE, AdminSchema);
    await queryInterface.createTable(CLIENT_TABLE, ClientSchema);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(ADMIN_TABLE);
    await queryInterface.dropTable(CLIENT_TABLE);
  }
};
