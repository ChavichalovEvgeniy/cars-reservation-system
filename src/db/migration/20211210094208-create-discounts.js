'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "discounts" (
        id            UUID CONSTRAINT discounts_pk PRIMARY KEY,
        min           INTEGER NOT NULL,
        max           INTEGER NOT NULL,
        percent       INTEGER NOT NULL,
        "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL,
        "updated_at"  TIMESTAMP WITH TIME ZONE NOT NULL,

        CONSTRAINT discounts_unique UNIQUE(percent)
      )
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TABLE "discounts"`);
  }
};
