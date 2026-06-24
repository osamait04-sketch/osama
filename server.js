const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// إخبار السيرفر بقراءة الملفات الثابتة من المجلد الرئيسي للمشروع
app.use(express.static(path.join(__dirname)));

// عند فتح الرابط، يقوم السيرفر بقراءة وعرض ملف index.html مباشرة
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر على البورت المحدد لـ Render
app.listen(PORT, () => {
    console.log(`Pharmacy Server is running on port ${PORT}`);
});