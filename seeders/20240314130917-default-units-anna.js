'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Units',
      Array.from({ length: 9 }).map((_, i) =>
        ({
          address: `台中市西區中正路${++i}號`,
          start_date: new Date(`202${--i}-03-16`),
          end_date: new Date(`202${++i}-03-15`),
          status: true,
          agency_id: 11,
          created_at: new Date(),
          updated_at: new Date()
        }), {})
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Units', null, {})
  }
}
