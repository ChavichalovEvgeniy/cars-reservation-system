'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'discounts',
      [
        {
          id: '4c934281-6f0c-4ee1-b0d0-6f8a0ba0864e',
          min: 3,
          max: 5,
          percent: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '61041860-32e5-4e38-8c8b-ee03f14cda7a',
          min: 6,
          max: 14,
          percent: 10,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 'e855ac4a-4859-453d-83bc-be4087d72a30',
          min: 15,
          max: 30,
          percent: 15,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('discounts', null, {});
  }
};
