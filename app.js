const db = require('./src/config/db.js')
const bolumRoute = require('./src/routes/bolumrouter.js')
const ogrenciRoute = require('./src/routes/ogrencirouter.js')
const express = require('express')
const App = express()

async function main() {
    try {
        db.sync()
        App.use('/bolum', bolumRoute)
        App.use('/ogrenci', ogrenciRoute)
    } catch (error) {
        console.error('İşlem sırasında bir hata oluştu:', error);
    }
}

main();












