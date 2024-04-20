const { Sequelize } = require('sequelize');

module.exports = new Sequelize('OgrenciDb', 'postgres', '117117', {
    host: 'localhost',
    dialect: 'postgres',
});


