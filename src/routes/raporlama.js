const nodemailer = require('nodemailer');
const fs = require('fs');
const { scheduleJob } = require('node-schedule');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_User, process.env.DB_Password, {
    host: process.env.DB_Host,
    dialect: process.env.DB_Dialect,
    port: process.env.port1,});

// Haftalık raporlama fonksiyonu
const haftalikRaporlama = async () => {
    try {
        // Öğrenci verilerini veritabanından alır.
        const ogrenciler = await sequelize.query('SELECT * FROM Ogrencis', { type: Sequelize.QueryTypes.SELECT });
        console.log("E-posta Gönderiliyor.")
        // JSON formatında dosyaya yazar.
        const jsonFilePath = 'ogrenciler.json';
        fs.writeFileSync(jsonFilePath, JSON.stringify(ogrenciler, null, 2));

        // E-posta gönderimi
        const transporter = nodemailer.createTransport({
            service: 'hotmail', // E-posta servisi
            auth: {
                user: "#", // E-posta kullanıcı adı (E-postayı gönderen hesap)
                pass: "#" // E-posta şifresi
            }
        });

        // E-posta içeriği
        const mailOptions = {
            from: "#", // Gönderenin e-posta adresi
            to: "#", // Alıcının e-posta adresi
            subject: 'Haftalık Öğrenci Raporlama', // E-posta konusu
            text: 'Haftalık rapor ektedir.', // E-posta içeriği
            attachments: [
                {
                    filename: 'ogrenciler.json', // JSON dosyasının adı
                    path: jsonFilePath // JSON dosyasının yolu
                }
            ]
        };

        // E-posta gönderimi
        await transporter.sendMail(mailOptions);
        console.log('E-posta başarıyla gönderildi.');
    } catch (error) {
        console.error('Bir hata oluştu:', error);
    }
};

// Haftalık raporlama.
const raporla=async () => {
    const cronPattern = process.env.PERIOD;
    scheduleJob(cronPattern, haftalikRaporlama);
}

module.exports=raporla;