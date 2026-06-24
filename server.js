const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد السيرفر ليعرض واجهة الصيدلية مباشرة عند فتح الرابط
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صيدلية الدكتور محمد غسان الحديدي</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-weight/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #007bff;
            --success-color: #28a745;
            --warning-color: #ffc107;
            --danger-color: #dc3545;
            --dark-color: #343a40;
            --light-color: #f8f9fa;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #eef2f7;
            margin: 0;
            padding: 0;
            color: var(--dark-color);
        }

        .header {
            background: linear-gradient(135deg, #0056b3, #007bff);
            color: white;
            padding: 25px 20px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            position: relative;
        }

        .header h1 {
            margin: 0;
            font-size: 2.2rem;
            font-weight: 700;
        }

        .header p {
            margin: 10px 0 0 0;
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .network-status {
            background-color: #d4edda;
            color: #155724;
            text-align: center;
            padding: 10px;
            font-weight: bold;
            font-size: 0.95rem;
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .container {
            max-width: 1200px;
            margin: 30px auto;
            padding: 0 20px;
        }

        .main-grid {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
        }

        @media (max-width: 900px) {
            .main-grid {
                grid-template-columns: 1fr;
            }
        }

        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.05);
            padding: 25px;
            margin-bottom: 25px;
        }

        .card-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f2f5;
            color: #0056b3;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .form-group {
            margin-bottom: 18px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 0.9rem;
        }

        input, select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ced4da;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 1rem;
            transition: border-color 0.2s;
        }

        input:focus, select:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(0,123,255,0.15);
        }

        .btn-submit {
            background-color: var(--success-color);
            color: white;
            border: none;
            padding: 14px;
            width: 100%;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .btn-submit:hover {
            background-color: #218838;
        }

        .search-box {
            margin-bottom: 20px;
            position: relative;
        }

        .search-box input {
            padding-right: 40px;
        }

        .search-box i {
            position: absolute;
            right: 15px;
            top: 15px;
            color: #6c757d;
        }

        .table-container {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: right;
        }

        th {
            background-color: #f0f4f8;
            color: #333;
            padding: 15px 12px;
            font-weight: 600;
            border-bottom: 2px solid #dee2e6;
        }

        td {
            padding: 14px 12px;
            border-bottom: 1px solid #dee2e6;
            font-size: 0.95rem;
        }

        tr:hover {
            background-color: #f8fafd;
        }

        .badge {
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: bold;
        }

        .badge-success { background-color: #d4edda; color: #155724; }
        .badge-danger { background-color: #f8d7da; color: #721c24; }

        .btn-action {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.1rem;
            padding: 5px;
            margin: 0 3px;
            border-radius: 4px;
        }

        .btn-delete { color: var(--danger-color); }
        .btn-delete:hover { background-color: #f8d7da; }

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

    <div class="header">
        <h1>صيدلية الدكتور محمد غسان الحديدي</h1>
        <p>نظام الإدارة السحابي والمحاسبة والمقاصة الذكية اللحظية</p>
    </div>

    <div class="network-status">
        <i class="fas fa-check-circle"></i>
        <span>متصل بالشبكة العالمية أونلاين - البيانات متزامنة ولحظية تماماً بين الأجهزة ✅</span>
    </div>

    <div class="container">
        <div class="main-grid">
            
            <div class="card">
                <div class="card-title">
                    <i class="fas fa-pills"></i> إدخال / سحب كمية العلاج
                </div>
                <form id="medicineForm">
                    <div class="form-group">
                        <label>اسم العلاج التجاري أو العلمي</label>
                        <input type="text" id="medName" required placeholder="مثال: Panadol Extra">
                    </div>
                    <div class="form-group">
                        <label>العملية المطلوبة</label>
                        <select id="actionType">
                            <option value="add">إضافة كمية واردة (+)</option>
                            <option value="subtract">سحب مبيعات أو تالف (-)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>الكمية بالعدد (صندوق / شريط)</label>
                        <input type="number" id="medQty" min="1" required placeholder="أدخل الكمية">
                    </div>
                    <button type="submit" class="btn-submit" id="submitBtn">تأكيد العملية المشتركة</button>
                </form>
            </div>

            <div class="card">
                <div class="card-title">
                    <i class="fas fa-boxes"></i> جرد ومراقبة المخزن اللحظي العالمي
                </div>
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="searchInp" placeholder="ابحث عن العلاج في المخزن الموحد مباشرة...">
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>اسم العلاج</th>
                                <th>الكمية الكلية الواردة</th>
                                <th>مجموع المسحوب</th>
                                <th>المتبقي الحالي في المخزن</th>
                                <th>حالة التوفر</th>
                                <th>إجراءات التحكم</th>
                            </tr>
                        </thead>
                        <tbody id="medicineTableBody">
                            </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    <script>
        // مفاتيح الاتصال العالمية المحدثة 100% بمستودع قاعدة البيانات السحابي
        const DB_URL = 'https://api.jsonbin.io/v3/b/66786638ad19ca34f87cf7a9';
        const MASTER_KEY = '$2a$10$W23M2vF9UoXNfNfev9p8vOzeqO.mX1N5Yp8.G2S8F3M5Fm3kK8Kqy';

        let inventory = {};

        function showLoading(show) {
            document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
        }

        // جلب البيانات من السيرفر أونلاين
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
                console.error("خطأ في جلب البيانات:", err);
                alert("لم نتمكن من جلب البيانات، يرجى التحقق من اتصال الإنترنت.");
            } finally {
                showLoading(false);
            }
        }

        // حفظ وتحديث البيانات على السيرفر العالمي
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
                console.error("خطأ في حفظ البيانات:", err);
                alert("حدث خطأ أثناء مزامنة البيانات السحابية.");
            } finally {
                showLoading(false);
            }
        }

        // بناء الجدول وعرض المخزون للمستخدم
        function renderTable() {
            const tbody = document.getElementById('medicineTableBody');
            const searchTerm = document.getElementById('searchInp').value.trim().toLowerCase();
            tbody.innerHTML = '';

            for (const name in inventory) {
                if (searchTerm && !name.toLowerCase().includes(searchTerm)) continue;

                const med = inventory[name];
                const totalIn = med.totalIn || 0;
                const totalOut = med.totalOut || 0;
                const current = totalIn - totalOut;
                const statusBadge = current > 5 
                    ? '<span class="badge badge-success">متوفر</span>' 
                    : '<span class="badge badge-danger">مخزون حرج</span>';

                const tr = document.createElement('tr');
                tr.innerHTML = \`
                    <td style="font-weight: 600; color: #1a1a1a;">\${name}</td>
                    <td style="color: var(--success-color); font-weight: bold;">\${totalIn}</td>
                    <td style="color: var(--danger-color); font-weight: bold;">\${totalOut}</td>
                    <td style="background-color: #fdfffe; font-weight: bold; font-size: 1.1rem; color: #0056b3;">\${current}</td>
                    <td>\${statusBadge}</td>
                    <td>
                        <button class="btn-action btn-delete" onclick="deleteMedicine('\${name}')" title="حذف بالكامل">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                \`;
                tbody.appendChild(tr);
            }
        }

        // معالجة إرسال الفورم للإضافة أو السحب
        document.getElementById('medicineForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('medName').value.trim();
            const action = document.getElementById('actionType').value;
            const qty = parseInt(document.getElementById('medQty').value);

            if (!name || isNaN(qty) || qty <= 0) return;

            if (!inventory[name]) {
                inventory[name] = { totalIn: 0, totalOut: 0 };
            }

            if (action === 'add') {
                inventory[name].totalIn += qty;
            } else if (action === 'subtract') {
                inventory[name].totalOut += qty;
            }

            document.getElementById('medicineForm').reset();
            await saveInventory();
        });

        // حذف العلاج نهائياً من القائمة
        async function deleteMedicine(name) {
            if (confirm(\`هل أنت متأكد من حذف علاج (\${name}) نهائياً من الجرد العام؟\`)) {
                delete inventory[name];
                await saveInventory();
            }
        }

        // تشغيل البحث التلقائي اللحظي
        document.getElementById('searchInp').addEventListener('input', renderTable);

        // تحميل البيانات فور تشغيل الصفحة وسحب المخزون الحالي
        window.addEventListener('DOMContentLoaded', fetchInventory);
    </script>
</body>
</html>
    `);
});

// تشغيل السيرفر على البورت المحدد لـ Render
app.listen(PORT, () => {
    console.log(`Pharmacy server is live and running globally on port ${PORT}`);
});