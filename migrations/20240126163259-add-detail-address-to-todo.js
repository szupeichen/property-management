'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameTable(
        'todos',
        'units'
      ),
      queryInterface.addColumn(
        'units',
        'address',
        {
          allowNull: false,
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'units',
        'startDate',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'units',
        'endDate',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'units',
        'agency',
        {
          allowNull: false,
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'units',
        'note',
        {
          allowNull: false,
          type: Sequelize.TEXT
        }
      ),
      queryInterface.addColumn(
        'units',
        'status',
        {
          allowNull: false,
          type: Sequelize.BOOLEAN
        }
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameTable('units', 'Todo'),
      queryInterface.removeColumn('tableName', 'columnName1'),
      queryInterface.removeColumn('units', 'address'),
      queryInterface.removeColumn('units', 'startDate'),
      queryInterface.removeColumn('units', 'endDate'),
      queryInterface.removeColumn('units', 'agency'),
      queryInterface.removeColumn('units', 'note'),
      queryInterface.removeColumn('units', 'status')
    ])
  }
}
