'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Unit.belongsTo(models.Agency, { foreignKey: 'agencyId' })
      Unit.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Unit.init({
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    income: DataTypes.INTEGER,
    annualIncome: DataTypes.INTEGER,
    startDate: DataTypes.DATE(6),
    endDate: DataTypes.DATE(6),
    note: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    agencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Agencies',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Unit',
    tableName: 'Units',
    underscored: true
  })
  return Unit
}
