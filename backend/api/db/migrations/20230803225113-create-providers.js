'use strict';

const { COMPANY_TABLE, companySchema } = require('../models/company.model');
const { INDEPENDENT_TABLE, IndependentSchema } = require('../models/independent.model');
const { PROVIDER_TABLE, providerSchema } = require('../models/provider.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(PROVIDER_TABLE, providerSchema)
    await queryInterface.createTable(COMPANY_TABLE, companySchema)
    await queryInterface.createTable(INDEPENDENT_TABLE, IndependentSchema)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(PROVIDER_TABLE)
    await queryInterface.dropTable(COMPANY_TABLE)
    await queryInterface.dropTable(INDEPENDENT_TABLE)

  }
};
