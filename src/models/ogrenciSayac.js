const Sequelize = require('sequelize')
const db = require('../config/db.js')

const ogrencisayac = db.define('ogrencisayac', {
    sayac: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    timestamps: false
})

module.exports = ogrencisayac