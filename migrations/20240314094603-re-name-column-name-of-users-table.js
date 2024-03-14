'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'createdAt', 'created_at')
    await queryInterface.renameColumn('Users', 'updatedAt', 'updated_at')
    await queryInterface.renameColumn('Users', 'isAdmin', 'is_admin')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'created_at', 'createdAt')
    await queryInterface.renameColumn('Users', 'updated_at', 'updatedAt')
    await queryInterface.renameColumn('Users', 'is_admin', 'isAdmin')
  }
}
