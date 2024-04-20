const Sequelize = require('sequelize')
const db = require('../config/db.js')
const Bolum = require('./bolum.js')

const Ogrenci = db.define('ogrenci', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,

    },
    email: {
        type: Sequelize.STRING,

    },
    dept_id: {
        type: Sequelize.INTEGER,
        foreignKeyConstraint: true,

    },
    counter: {
        type: Sequelize.INTEGER,
    },
})

Ogrenci.belongsTo(Bolum, { foreignKey: 'dept_id', onDelete: 'cascade' })

module.exports = Ogrenci