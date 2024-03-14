'use strict'

/** @type {import('sequelize-cli').Migration} */
const SEED_AGENCY = {
  name: 'Anna Wang',
  phoneNumber: '0912345678',
  company: '信亦房屋'
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Agencies', [{
      name: SEED_AGENCY.name,
      phone_number: SEED_AGENCY.phoneNumber,
      company: SEED_AGENCY.company,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
      .then(agency_id => queryInterface.bulkInsert('Units',
        Array.from({ length: 9 }).map((_, i) =>
          ({
            address: `台中市西區中正路${++i}號`,
            start_date: new Date(`202${--i}-03-16`),
            end_date: new Date(`202${++i}-03-15`),
            status: true,
            agency_id,
            created_at: new Date(),
            updated_at: new Date()
          })
        ), {}))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Units', null, {})
      .then(() => queryInterface.bulkDelete('Agencies', null, {}))
  }
}
