const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد السيرفر ليعرض واجهة الصيدلية المحدثة مباشرة
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صيدلية محمد غسان الحديدي</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-weight/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #318084;
            --primary-hover: #256366;
            --bg-color: #eef2f5;
            --text-color: #333333;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            margin: 0;
            padding: 0;
            color: var(--text-color);
            position: relative;
        }

        /* إضافة الشعار المائي في خلفية الصفحة بالكامل لتصميم فخم */
        body::before {
            content: "";
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 500px;
            background: url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Bowl_of_Hygieia_alternative.svg') no-repeat center;
            background-size: contain;
            opacity: 0.04; /* درجة الشفافية المائية */
            z-index: -1;
            pointer-events: none;
        }

        .container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 20px;
        }

        /* تصميم اسم الصيدلية بخط كبير، عريض، وعميق */
        .pharmacy-title {
            text-align: center;
            font-size: 3rem;
            font-weight: 900;
            color: var(--primary-color);
            margin-bottom: 5px;
            letter-spacing: 1px;
            text-shadow: 2px 3px 6px rgba(49, 128, 132, 0.25);
        }

        .status-bar {
            background-color: #e1f0f1;
            color: #215456;
            text-align: center;
            padding: 12px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 30px;
            border: 1px solid #b9dcde;
        }

        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04);
            padding: 30px;
            margin-bottom: 30px;
        }

        /* تصميم حقول الإدخال بنفس توزيع الصورة الأصلية */
        .form-row {
            display: grid;
            grid-template-columns: 2fr 1.5fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            font-weight: 600;
            margin-bottom: 8px;
            color: #555;
            font-size: 0.95rem;
        }

        input, select {
            padding: 12px;
            border: 1px solid #cccccc;
            border-radius: 6px;
            font-size: 1rem;
            background-color: #fafafa;
            box-sizing: border-box;
        }

        input:focus, select:focus {
            outline: none;
            border-color: var(--primary-color);
            background-color: #fff;
        }

        /* حقل الكمية المدمج مع الفئة بجانبه */
        .qty-input-container {
            display: flex;
            gap: 5px;
        }
        
        .qty-input-container input {
            flex: 2;
        }
        
        .qty-input-container select {
            flex: 1.5;
            min-width: 90px;
            background-color: #f0f4f5;
            font-weight: 600;
        }

        .btn-submit {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 14px;
            width: 100%;
            border-radius: 6px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 10px;
            box-shadow: 0 4px 12px rgba(49, 128, 132, 0.2);
        }

        .btn-submit:hover {
            background-color: var(--primary-hover);
        }

        /* تنسيق جدول عرض المخزن الموحد كالصورة الأصلية */
        .table-container {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            margin-top: 10px;
        }

        th {
            background-color: var(--primary-color);
            color: white;
            padding: 14px;
            font-weight: 600;
            font-size: 1rem;
        }

        th:first-child { border-top-right-radius: 8px; }
        th:last-child { border-top-left-radius: 8px; }

        td {
            padding: 14px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 1rem;
            background-color: #ffffff;
        }

        tr:last-child td:first-child { border-bottom-right-radius: 8px; }
        tr:last-child td:last-child { border-bottom-left-radius: 8px; }

        .search-box {
            margin-bottom: 20px;
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            border: 1px solid #b9dcde;
            border-radius: 8px;
            background-color: #f7fbfc;
        }

        .btn-delete {
            background: none;
            border: none;
            color: #d9534f;
            cursor: pointer;
            font-size: 1.1rem;
            padding: 5px;
            border-radius: 4px;
        }

        .btn-delete:hover {
            background-color: #fdf2f2;
        }

        .loading-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(255,255,255,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            display: none;
        }

        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>

    <div class="loading-overlay" id="loadingOverlay">
        <div class="spinner"></div>
    </div>

    <div class="container">
        <div class="pharmacy-title">صيدلية محمد غسان الحديدي</div>
        
        <div class="status-bar">
            <i class="fas fa-sync-alt fa-spin" style="margin-left: 5px;"></i>
            يعمل بالوضع المستقر والمزامنة متوفرة محلياً وعالمياً أونلاين
        </div>

        <div class="card">
            <form id="medicineForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="medName">اسم العلاج</label>
                        <input type="text" id="medName" required placeholder="اكتب أو اختر العلاج...">
                    </div>
                    
                    <div class="form-group">
                        <label for="medQty">الكمية الكلية والفرعية</label>
                        <div class="qty-input-container">
                            <input type="number" id="medQty" min="1" required placeholder="مثال: 1000">
                            <select id="unitType">
                                <option value="صندوق">صندوق</option>
                                <option value="شريط">شريط</option>
                                <option value="علبة">علبة</option>
                                <option value="مفرد">مفرد</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="actionType">نوع العملية</label>
                        <select id="actionType">
                            <option value="add">إضافة (+)</option>
                            <option value="subtract">سحب (-)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn-submit">تأكيد العملية (إضافة / سحب)</button>
            </form>
        </div>

        <div class="card">
            <input type="text" id="searchInp" class="search-box" placeholder="🔍 ابحث في المخزن الحالي أونلاين بشكل سريع...">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>اسم العلاج</th>
                            <th>الكمية الكلية</th>
                            <th>مجموع المسحوب</th>
                            <th>المتبقي في المخزن</th>
                            <th>إجراءات التحكم</th>
                        </tr>
                    </thead>
                    <tbody id="medicineTableBody">
                        </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        const DB_URL = 'https://api.jsonbin.io/v3/b/66786638ad19ca34f87cf7a9';
        const MASTER_KEY = '$2a$10$W23M2vF9UoXNfNfev9p8vOzeqO.mX1N5Yp8.G2S8F3M5Fm3kK8Kqy';

        let inventory = {};

        function showLoading(show) {
            document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
        }

        async function fetchInventory() {
            showLoading(true);
            try {
                const res = await fetch(DB_URL + '/latest', {
                    headers: { 'X-Master-Key': MASTER_KEY }
                });
                const data = await res.json();
                inventory = data.record || {};
                renderTable();
            } catch (err) {
                console.error("خطأ جلب البيانات:", err);
            } finally {
                showLoading(false);
            }
        }

        async function saveInventory() {
            showLoading(true);
            try {
                await fetch(DB_URL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': MASTER_KEY
                    },
                    body: JSON.stringify(inventory)
                });
                renderTable();
            } catch (err) {
                console.error("خطأ حفظ البيانات:", err);
            } finally {
                showLoading(false);
            }
        }

        function renderTable() {
            const tbody = document.getElementById('medicineTableBody');
            const searchTerm = document.getElementById('searchInp').value.trim().toLowerCase();
            tbody.innerHTML = '';

            for (const name in inventory) {
                if (searchTerm && !name.toLowerCase().includes(searchTerm)) continue;

                const med = inventory[name];
                const totalIn = med.totalIn || 0;
                const totalOut = med.totalOut || 0;
                const unit = med.unit || 'صندوق'; // جلب الفئة المخزنة للعلاج
                const current = totalIn - totalOut;

                const tr = document.createElement('tr');
                tr.innerHTML = \`
                    <td style="font-weight: 600;">\${name}</td>
                    <td style="color: #2e7d32; font-weight: bold;">\${totalIn} \${unit}</td>
                    <td style="color: #c62828; font-weight: bold;">\${totalOut} \${unit}</td>
                    <td style="background-color: #f7fbfc; font-weight: bold; color: var(--primary-color);">\${current} \${unit}</td>
                    <td>
                        <button class="btn-action btn-delete" onclick="deleteMedicine('\${name}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                \`;
                tbody.appendChild(tr);
            }
        }

        document.getElementById('medicineForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('medName').value.trim();
            const action = document.getElementById('actionType').value;
            const qty = parseInt(document.getElementById('medQty').value);
            const unit = document.getElementById('unitType').value;

            if (!name || isNaN(qty) || qty <= 0) return;

            if (!inventory[name]) {
                inventory[name] = { totalIn: 0, totalOut: 0, unit: unit };
            }
            
            // تحديث الفئة في حال تغيرت مع المعاملة الجديدة
            inventory[name].unit = unit;

            if (action === 'add') {
                inventory[name].totalIn += qty;
            } else if (action === 'subtract') {
                inventory[name].totalOut += qty;
            }

            document.getElementById('medicineForm').reset();
            await saveInventory();
        });

        async function deleteMedicine(name) {
            if (confirm(\`هل أنت متأكد من حذف علاج (\${name}) نهائياً؟\`)) {
                delete inventory[name];
                await saveInventory();
            }
        }

        document.getElementById('searchInp').addEventListener('input', renderTable);
        window.addEventListener('DOMContentLoaded', fetchInventory);
    </script>
</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`Pharmacy server is live on port ${PORT}`);
});