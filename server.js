// server.js ထဲမှာ ထည့်ရန်
require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const app = express();
const path = require('path');

app.use(express.json());
// Static files တွေအတွက် (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ၂။ အဓိက လိပ်စာ (/) ကို နှိပ်ရင် ဘာပြမလဲ သတ်မှတ်ရန်
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

// ၁။ Post အားလုံးကို ပြန်ယူရန် (Read)
app.get('/api/posts', (req, res) => {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC'; // အသစ်ဆုံးတွေကို အပေါ်ကပြရန်
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ၂။ Post အသစ်တင်ရန် (Create)
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    const sql = 'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)';
    db.query(sql, [title, content, author], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Post created successfully!" });
    });
});

app.listen(3000, () => console.log("Blog Server running on port 3000"));