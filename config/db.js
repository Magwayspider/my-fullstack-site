// config/db.js
const mysql = require('mysql2');

// အွန်လိုင်း Database Link (URL) ရှိမရှိ စစ်ဆေးခြင်း
// အကယ်၍ process.env.DB_URL (Render ပေါ်က variable) ရှိရင် အဲဒါကို သုံးမယ်၊ 
// မရှိရင် (သင့်စက်ထဲမှာဆိုရင်) localhost settings ကို သုံးမယ်။

const connection = mysql.createConnection(process.env.DB_URL || {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pso_school'
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
        return;
    }
    console.log('✅ Database connected successfully!');
});

module.exports = connection;