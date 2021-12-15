'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE "bookings" (
        id            UUID CONSTRAINT bookings_pk PRIMARY KEY,
        start_day     TIMESTAMP WITH TIME ZONE NOT NULL,
        end_day       TIMESTAMP WITH TIME ZONE NOT NULL,
        car_id        UUID NOT NULL,
        "created_at"  TIMESTAMP WITH TIME ZONE NOT NULL,
        "updated_at"  TIMESTAMP WITH TIME ZONE NOT NULL,

        CONSTRAINT bookings_fk FOREIGN KEY(car_id) REFERENCES "cars" (id) ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TABLE "bookings"`);
  }
};
