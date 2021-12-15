'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "cars" (
        id            UUID CONSTRAINT cars_pk PRIMARY KEY,
        model         varchar(255) NOT NULL,
        brand         varchar(255) NOT NULL,
        plate         varchar(255) NOT NULL,
        vin           varchar(17) NOT NULL,
        "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL,
        "updated_at"  TIMESTAMP WITH TIME ZONE NOT NULL,

        CONSTRAINT cars_unique UNIQUE(plate,vin)
      )
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TABLE "cars"`);
  }
};
