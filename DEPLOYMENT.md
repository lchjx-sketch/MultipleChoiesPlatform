# Netlify 部署指南

## 問題
在 Netlify 上部署靜態網站時，無法直接修改 `user.json` 文件。排行榜數據會回退到 localStorage。

## 解決方案

### 推薦方案：使用 Firebase Realtime Database

#### 步驟 1：創建 Firebase 項目
1. 訪問 [Firebase Console](https://console.firebase.google.com/)
2. 創建新項目
3. 啟用 Realtime Database
4. 複製你的 Firebase 配置

#### 步驟 2：更新 index.html

在 `<head>` 中添加 Firebase SDK：
```html
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js"></script>
```

#### 步驟 3：配置 Firebase（在 App 函數中）
```javascript
// Firebase 配置（替換成你自己的）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
```

#### 步驟 4：修改排行榜保存邏輯
將 API 調用改為 Firebase 操作：
```javascript
// 替代 fetch 調用
const dbRef = firebase.database().ref('users');
dbRef.set(updatedUsers);
```

### 備選方案：使用自己的 Node.js 伺服器

如果你有自己的伺服器，可以：
1. 部署 Node.js 伺服器到 Heroku、Railway 或 Render
2. 在 Netlify 上配置 CORS 和代理規則
3. 更新 API 端點指向你的伺服器

### 當前配置
- 本地開發：使用 `http://localhost:3000/api/users`
- Netlify 部署：使用 `/.netlify/functions/update-users`

## 部署步驟
1. `git add .`
2. `git commit -m "Add Netlify deployment support"`
3. `git push`
4. Netlify 會自動部署

## 注意事項
- 不要在代碼中暴露 API 密鑰，使用環境變數
- 在 Netlify 環境變數設置中添加敏感信息
- 定期測試排行榜更新功能
