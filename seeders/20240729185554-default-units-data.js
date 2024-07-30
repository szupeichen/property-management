'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const agencies = await queryInterface.sequelize.query(
      'SELECT id FROM Agencies;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Units',
      Array.from({ length: 4 }).map((_, i) =>
        ({
          city: '新北市汐止區',
          address: `葛瑪蘭大道${i + 33}號`,
          income: (1130 * i),
          annual_income: (1130 * i) * 12,
          note: '員工宿舍',
          start_date: new Date(`202${++i}-07-19`),
          end_date: new Date(`204${++i}-07-18`),
          status: true,
          agency_Id: agencies[Math.floor(Math.random() * agencies.length)].id,
          user_Id: users[Math.floor(Math.random() * users.length)].id,
          created_at: new Date(),
          updated_at: new Date()
        })
      ), {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Units', null, {})
  }
}
