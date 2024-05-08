const db = require("./src/config/db.js");
const ogrencisayac = require("./src/models/ogrenciSayac.js");
const bolumRoute = require("./src/routes/bolumrouter.js");
const ogrenciRoute = require("./src/routes/ogrencirouter.js");
const authRoute = require("./src/routes/authRouter.js");
const cookieParser = require("cookie-parser");
const haftalikRaporlama = require("./src/routes/raporlama.js");

const authToken = require("./src/models/authToken.js");

const express = require("express");
const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());

async function main() {
  try {
    db.sync();
    db.afterSync("afterSync", async () => {
      const rowCount = await ogrencisayac.count();
      if (rowCount === 0) {
        await ogrencisayac.create({ initialValue: 0 });
      }
    });
    App.use("/bolum", bolumRoute);
    App.use("/ogrenci", authToken, ogrenciRoute);
    App.use("/auth", authRoute);
    haftalikRaporlama();

    App.listen(process.env.PORT1, () => {
      console.log(
        `Sunucu ${process.env.PORT1} numaralı porta başarıyla bağlandı.`
      );
    });
  } catch (error) {
    console.error("İşlem sırasında bir hata oluştu:", error);
  }
}

main();
