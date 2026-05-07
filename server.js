// server.js ထဲမှာ ထည့်ရန်
const express = require('express');
const db = require('./config/db');
const app = express();

app.use(express.json());
app.use(express.static('public'));

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