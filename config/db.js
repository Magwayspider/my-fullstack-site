const mysql = require('mysql2');

// Database နှင့် ချိတ်ဆက်ရန် သတ်မှတ်ချက်များ
const dbConfig = {
    host: 'localhost',
    user: 'root',      // XAMPP သုံးပါက 'root' ဖြစ်သည်
    password: '',      // XAMPP တွင် password အလွတ်ဖြစ်သည်
    database: 'pso_school' // phpMyAdmin တွင် သင်ဆောက်ထားသော Database အမည်
};

// Connection တည်ဆောက်ခြင်း
const connection = mysql.createConnection(dbConfig);

// ချိတ်ဆက်မှုကို စတင်ခြင်း
connection.connect((err) => {
    if (err) {
        console.error('❌ Database ချိတ်ဆက်မှု အမှားဖြစ်နေသည်:', err.message);
        // ၁၀ စက္ကန့်ကြာလျှင် ပြန်ချိတ်ရန် ကြိုးစားမည်
        setTimeout(() => {
            console.log("🔄 Database သို့ ပြန်လည်ချိတ်ဆက်ရန် ကြိုးစားနေသည်...");
            connection.connect();
        }, 10000);
        return;
    }
    console.log('✅ MySQL Database နှင့် အောင်မြင်စွာ ချိတ်ဆက်ပြီးပါပြီ။');
});

// တခြားဖိုင် (server.js) ကနေ လှမ်းသုံးလို့ရအောင် Export လုပ်ခြင်း
module.exports = connection;