const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const imgs = this.getDataValue('img');
      if (!imgs) return [];
      return imgs.split(';').map(img => img.trim());
    },
    set(val) {
      if (Array.isArray(val)) {
        this.setDataValue('img', val.join(';'));
      } else {
        this.setDataValue('img', val);
      }
    }
  },
  asin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  mrp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ratingTotal: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  discount: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seller: {
    type: DataTypes.STRING,
    allowNull: false
  },
  purl: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Product;
