const db = require('./src/config/db.js')
const ogrencisayac = require('./src/models/ogrenciSayac.js')
const bolumRoute = require('./src/routes/bolumrouter.js')
const ogrenciRoute = require('./src/routes/ogrencirouter.js')
const haftalikRaporlama = require('./src/routes/raporlama.js')
const express = require('express')
const App = express()

async function main() {
    try {
        db.sync()
        db.afterSync('afterSync', async () => {
            const rowCount = await ogrencisayac.count();
            if (rowCount === 0) {
                await ogrencisayac.create({ initialValue: 0 });
            }
        })
        App.use('/bolum', bolumRoute)
        App.use('/ogrenci', ogrenciRoute)
        haftalikRaporlama()
    } catch (error) {
        console.error('İşlem sırasında bir hata oluştu:', error);
    }
}

main();












