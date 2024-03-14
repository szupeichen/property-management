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
      phoneNumber: SEED_AGENCY.phoneNumber,
      company: SEED_AGENCY.company,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
      .then(agencyId => queryInterface.bulkInsert('Units',
        Array.from({ length: 10 }).map((_, i) =>
          ({
            name: ,
          address: `台中市西區中正路-${++i}號`,
            agencyId,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        ), {}))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  }
}
