'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'tariffs',
      [
        {
          id: '4c934281-6f0c-4ee1-b0d0-6f8a0ba0864e',
          distance: 200,
          amount: 270,
          name: 'Первый тариф',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '61041860-32e5-4e38-8c8b-ee03f14cda7a',
          distance: 390,
          amount: 500,
          name: 'Второй тариф',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 'e855ac4a-4859-453d-83bc-be4087d72a30',
          distance: 350,
          amount: 330,
          name: 'Третий тариф',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tariffs', null, {});
  }
};
