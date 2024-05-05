const db = require("../config/db.js");
const Ogrenci = require("../models/ogrenci.js");
const Sayac = require("../models/ogrenciSayac.js");
const express = require("express");
const router = express.Router();
require("dotenv").config();

//App.use(express.json());

db.afterCreate("afterCreate", async (instance) => {
  if (instance instanceof Ogrenci) {
    await db.query("UPDATE ogrencisayacs SET sayac = sayac + 1");
    //await ogrencisayac.increment('sayac', { by: 1, where: { id: 1 } });
  }
});

db.afterDestroy("afterDestroy", async (instance) => {
  if (instance instanceof Ogrenci) {
    await db.query("UPDATE ogrencisayacs SET sayac = sayac -1");
    //await ogrencisayac.decrement('sayac', { by: 1, where: { id: 1 } });
  }
});

router.get("/", async (req, res) => {
  try {
    const ogrenciler = await Ogrenci.findAll();

    res.json(ogrenciler); // Öğrencileri JSON formatında yanıtla
  } catch (error) {
    console.error(error);
    res.status(500).send("Sunucu hatası");
  }
});

router.get("/:id", async (req, res) => {
  const ogrenciId = parseInt(req.params.id);

  try {
    if (!ogrenciId) {
      return res.status(400).send("Lütfen departman ID'sini giriniz");
    }

    const ogrenci = await Ogrenci.findOne({
      where: {
        id: ogrenciId,
      },
    });

    if (!ogrenci || ogrenci.length === 0) {
      return res.status(404).json({ message: "Belirtilen öğrenci bulunamadı" });
    }

    res.status(200).json(ogrenci);
  } catch (error) {
    console.error(error);
    res.status(500).send("İşlem başarısız oldu");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, dept_id, counter } = req.body;

    if (!name || !email || !dept_id || !counter) {
      return res.status(400).send("Lütfen tüm değerleri giriniz");
    }

    const ogrenci = await Ogrenci.create({ name, email, dept_id, counter });
    res.status(201).json(ogrenci);
  } catch (error) {
    console.error(error);
    res.status(500).send("İşlem başarısız oldu");
  }
});

router.delete("/", async (req, res) => {
  const userId = parseInt(req.body.id);
  try {
    if (!userId) {
      return res.status(400).send("Lütfen tüm değerleri giriniz");
    }
    const ogrenci = await Ogrenci.findByPk(userId);

    if (ogrenci == null) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    await ogrenci.destroy();
    Sayac.afterDestroy(async () => {
      await Sayac.decrement("sayac");
    });
    res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    console.error(error);
    res.status(500).send("İşlem başarısız oldu");
  }
});

router.put("/", async (req, res) => {
  const userId = parseInt(req.body.id);

  try {
    const { name, email } = req.body;

    if (!userId || !name || !email) {
      return res.status(400).send("Lütfen tüm değerleri giriniz");
    }

    const ogrenci = await Ogrenci.findByPk(userId);

    if (ogrenci == null) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    await ogrenci.update({ name: name, email: email });
    res.status(201).json(ogrenci);
  } catch (e) {
    console.error(error);
    res.status(500).send("İşlem başarısız oldu");
  }
});

module.exports = router;
