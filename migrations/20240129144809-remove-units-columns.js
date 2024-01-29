'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'units',
        'isDone'
      ),
      queryInterface.removeColumn(
        'units',
        'agency'
      ),
      queryInterface.renameColumn(
        'units',
        'UserId',
        'agencyId')
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'units',
        'isDone',
        {
          defaultValue: false,
          type: Sequelize.BOOLEAN
        }),
      queryInterface.addColumn(
        'units',
        'agency',
        {
          allowNull: false,
          type: Sequelize.STRING
        }
      ),
      queryInterface.renameColumn('units', 'agencyId', 'UserId')

    ])
  }
}
