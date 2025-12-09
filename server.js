const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const USER_FILE = path.join(__dirname, 'user.json');

// 讀取 user.json
app.get('/api/users', (req, res) => {
    try {
        const data = fs.readFileSync(USER_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: '無法讀取用戶文件' });
    }
});

// 更新 user.json - 保存最高成績
app.post('/api/users', (req, res) => {
    try {
        const updatedUsers = req.body;
        fs.writeFileSync(USER_FILE, JSON.stringify(updatedUsers, null, 2), 'utf8');
        res.json({ success: true, message: '用戶數據已保存' });
    } catch (err) {
        console.error('保存失敗:', err);
        res.status(500).json({ error: '無法保存用戶文件' });
    }
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`智選 Quiz Platform 伺服器運行於 http://localhost:${PORT}`);
    console.log('按 Ctrl+C 停止伺服器');
});
