const Bolum = require('../models/bolum.js');
const express = require('express');
const App = express();

App.listen(process.env.PORT1, () => {
    console.log(`Sunucu ${process.env.PORT1} numaralı porta başarıyla bağlandı.`);
});

App.use(express.json())

App.post('/bolum', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send('Lütfen tüm değerleri giriniz');
        }

        const bolum = await Bolum.create({ name });
        res.status(201).json(bolum);
    } catch (error) {
        console.error(error);
        res.status(500).send('İşlem başarısız oldu');
    }
});

App.delete('/bolum', async (req, res) => {
    const bolumId = parseInt(req.body.id);
    try {
        const { } = req.body;

        if (!bolumId) {
            return res.status(400).send('Lütfen tüm değerleri giriniz');
        }
        const bolum = await Bolum.findByPk(bolumId)

        if (bolum == null) {
            return res.status(404).json({ message: 'Bolum bulunamadı' });
        }

        await bolum.destroy();
        res.status(200).json({ message: 'Bolum başarıyla silindi' });

    } catch (error) {
        console.error(error);
        res.status(500).send('İşlem başarısız oldu')
    }
});

App.put('/bolum', async (req, res) => {
    const bolumId = parseInt(req.body.id)

    try {
        const { name } = req.body

        if (!bolumId) {
            return res.status(400).send('Lütfen tüm değerleri giriniz');
        }

        const bolum = await Bolum.findByPk(bolumId)

        if (bolum == null) {
            return res.status(404).json({ message: 'Bolum bulunamadı' });
        }

        await bolum.update({ name: name })
        res.status(201).json(bolum);

    } catch (e) {
        console.error(error);
        res.status(500).send('İşlem başarısız oldu');
    }
})

module.exports = App;