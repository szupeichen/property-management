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
      email: SEED_AGENCY.email,
      company: SEED_AGENCY.company,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
      .then(userId => queryInterface.bulkInsert('Units',
        Array.from({ length: 10 }).map((_, i) =>
          ({
            name: `中正路-${i}號`,
            agencyId: userId,
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
