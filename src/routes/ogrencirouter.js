const db = require('../config/db.js');
const Ogrenci = require('../models/ogrenci.js');
const Sayac = require('../models/ogrenciSayac.js')
const express = require('express');
const App = express();
require('dotenv').config();

App.listen(process.env.PORT2, () => {
    console.log(`Sunucu ${process.env.PORT2} numaralı porta başarıyla bağlandı.`);
});

App.use(express.json())

db.afterCreate('afterCreate', async (instance) => {
    if (instance instanceof Ogrenci) {
        await db.query('UPDATE ogrencisayacs SET sayac = sayac + 1');
        //await ogrencisayac.increment('sayac', { by: 1, where: { id: 1 } });
    }
});

db.afterDestroy('afterDestroy', async (instance) => {
    if (instance instanceof Ogrenci) {
        await db.query('UPDATE ogrencisayacs SET sayac = sayac -1');
        //await ogrencisayac.decrement('sayac', { by: 1, where: { id: 1 } });
    }
})

App.post('/ogrenci', async (req, res) => {
    try {
        const { name, email, dept_id, counter } = req.body;

        if (!name || !email || !dept_id || !counter) {
            return res.status(400).send('Lütfen tüm değerleri giriniz');
        }

        const ogrenci = await Ogrenci.create({ name, email, dept_id, counter });
        res.status(201).json(ogrenci);
    } catch (error) {
        console.error(error);
        res.status(500).send('İşlem başarısız oldu');
    }
});

App.delete('/ogrenci', async (req, res) => {
    const userId = parseInt(req.body.id);
    try {

        if (!userId) {
            return res.status(400).send('Lütfen tüm değerleri giriniz');
        }
        const ogrenci = await Ogrenci.findByPk(userId)

        if (ogrenci == null) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        await ogrenci.destroy()
        Sayac.afterDestroy(async () => {
            await Sayac.decrement('sayac');
        });
        res.status(200).json({ message: 'Kullanıcı başarıyla silindi' });

    } catch (error) {
        console.error(error);
        res.status(500).send('İşlem başarısız oldu')
    }
});

App.put('/ogrenci', async (req, res) => {
    const userId = parseInt(req.body.id)

    try {
        const { name, email } = req.body

        if (!userId || !name || !email) {
            return res.status(400).send('Lütfen tüm değerleri giriniz');
        }

        const ogrenci = await Ogrenci.findByPk(userId)

        if (ogrenci == null) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        await ogrenci.update({ name: name, email: email })
        res.status(201).json(ogrenci);

    } catch (e) {
        console.error(error);
        res.status(500).send('İşlem başarısız oldu');
    }
})

module.exports = App;