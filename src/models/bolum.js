const Sequelize = require('sequelize')
const db = require('../config/db.js')

const Bolum = db.define('bolum', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,

    },
})

module.exports = Bolum