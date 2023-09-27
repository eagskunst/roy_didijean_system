'use strict';

const { GARMENT_TABLE, GarmentSchema } = require('../models/garments.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/products.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(GARMENT_TABLE, GarmentSchema);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(GARMENT_TABLE);
  }
};
