'use strict';

const { BILL_TABLE, BillSchema } = require('../models/bill.model');
const { TRANSACTION_TABLE, TransactionSchema } = require('../models/transaction.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.createTable(BILL_TABLE, BillSchema);
    await queryInterface.createTable(TRANSACTION_TABLE, TransactionSchema);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(TRANSACTION_TABLE);
    // await queryInterface.dropTable(BILL_TABLE);
  }
};
