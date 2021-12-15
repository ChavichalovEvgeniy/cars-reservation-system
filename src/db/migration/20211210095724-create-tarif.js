'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "tariffs" (
        id            UUID CONSTRAINT tariffs_pk PRIMARY KEY,
        distance      INTEGER NOT NULL,
        amount        INTEGER NOT NULL,
        name          varchar(100) NOT NULL,
        "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL,
        "updated_at"  TIMESTAMP WITH TIME ZONE NOT NULL,

        CONSTRAINT tariffs_unique UNIQUE(name)
      )
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TABLE "tariffs"`);
  }
};
