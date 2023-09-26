const { Model, DataTypes, Sequelize} = require('sequelize')
const { PRODUCT_TABLE } = require('./products.model')

const GARMENT_TABLE = "garments"

const GarmentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  product_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
          model: PRODUCT_TABLE,
          key: 'id'
      },
      onDelete: 'CASCADE'
  },
  size: {
      allowNull: true,
      type: DataTypes.STRING,
  },
  material: {
      allowNull: true,
      type: DataTypes.STRING
  },
  style: {
      allowNull: true,
      type: DataTypes.STRING
  },
  brand: {
    allowNull: true,
    type: DataTypes.STRING
  },
  color: {
    allowNull: true,
    type: DataTypes.STRING
  },
  type: {
    allowNull: false,
    type: DataTypes.ENUM(['upper', 'lower', 'full'])
  },
  created_date: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Garment extends Model {
    static associate(models) {
        this.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id",
            allowNull: false
         })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: GARMENT_TABLE,
            modelName: 'Garment',
            timestamps: false
        }
    }
}

module.exports = { GARMENT_TABLE, GarmentSchema, Garment }
