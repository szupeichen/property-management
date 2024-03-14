'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Units',
      Array.from({ length: 9 }).map((_, i) =>
        ({
          address: `台中市北區信義路${(++i) * i}號`,
          start_date: new Date(`202${--i}-07-19`),
          end_date: new Date(`202${++i}-07-18`),
          status: false,
          agency_id: 12,
          created_at: new Date(),
          updated_at: new Date()
        }), {})
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Units', null, {})
  }
}
