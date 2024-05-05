const Bolum = require("../models/bolum.js");
const express = require("express");
const router = express.Router();
//const App = express();

//App.use(express.json());

router.get("/", async (req, res) => {
  try {
    const bolums = await Bolum.findAll();

    res.json(bolums); // Öğrencileri JSON formatında yanıtla
  } catch (error) {
    console.error(error);
    res.status(500).send("Sunucu hatası");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Lütfen tüm değerleri giriniz");
    }

    const bolum = await Bolum.create({ name });
    res.status(201).send("Bölüm başarıyla ekledi");
  } catch (error) {
    console.error(error);
    res.status(500).send("İşlem başarısız oldu");
  }
});

// router.delete("/", async (req, res) => {
//   const bolumId = parseInt(req.body.id);
//   try {
//     const { bolumId } = req.body;

//     if (!bolumId) {
//       return res.status(400).send("Lütfen tüm değerleri giriniz");
//     }
//     const bolum = await Bolum.findByPk(bolumId);

//     if (bolum == null) {
//       return res.status(404).json({ message: "Bolum bulunamadı" });
//     }

//     await bolum.destroy();
//     res.status(200).json({ message: "Bolum başarıyla silindi" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("İşlem başarısız oldu");
//   }
// });

router.delete("/:dept_id", async (req, res) => {
  const bolumId = parseInt(req.params.dept_id); // URL parametresinden bölüm ID'sini al
  try {
    if (!bolumId) {
      return res.status(400).send("Lütfen tüm değerleri giriniz");
    }
    const bolum = await Bolum.findByPk(bolumId);

    if (bolum == null) {
      return res.status(404).json({ message: "Bolum bulunamadı" });
    }

    await bolum.destroy();
    res.status(200).json({ message: "Bolum başarıyla silindi" });
  } catch (error) {
    console.error(error);
    res.status(500).send("İşlem başarısız oldu");
  }
});

router.put("/", async (req, res) => {
  const bolumId = parseInt(req.body.id);

  try {
    const { name } = req.body;

    if (!bolumId) {
      return res.status(400).send("Lütfen tüm değerleri giriniz");
    }

    const bolum = await Bolum.findByPk(bolumId);

    if (bolum == null) {
      return res.status(404).json({ message: "Bolum bulunamadı" });
    }

    await bolum.update({ name: name });
    res.status(201).json(bolum);
  } catch (e) {
    console.error(error);
    res.status(500).send("İşlem başarısız oldu");
  }
});

module.exports = router;
