# Netlify 部署指南

## 目標
在 Netlify 上部署靜態網站，使所有用戶的排行榜數據能夠同步，無需數據庫。

## 解決方案：GitHub API

使用 GitHub API 將排行榜數據直接保存到 GitHub 倉庫的 `user.json` 文件中。這樣：
- ✅ 所有用戶都能看到最新的排行榜
- ✅ 數據持久化在 GitHub 上
- ✅ 無需額外的數據庫
- ✅ 本地開發和 Netlify 部署都支持

## 設置步驟

### 步驟 1：創建 GitHub Personal Access Token

1. 訪問 https://github.com/settings/tokens
2. 點擊 "Generate new token"
3. 選擇權限：
   - ✅ `repo` (完整的倉庫訪問權限)
4. 複製生成的 token（保存在安全的地方！）

### 步驟 2：配置 Netlify 環境變數

1. 登錄 Netlify
2. 進入你的項目 → Settings → Environment
3. 添加新的環境變數：
   - **Key**: `GITHUB_TOKEN`
   - **Value**: 粘貼你的 GitHub token

### 步驟 3：推送代碼

```bash
git add .
git commit -m "Setup GitHub API for leaderboard sync"
git push
```

Netlify 會自動部署。

## 工作流程

```
用戶完成測驗
    ↓
計算成績
    ↓
更新 allowedUsers state
    ↓
生成新排行榜
    ↓
保存到 localStorage（備份）
    ↓
POST 到 /.netlify/functions/update-users
    ↓
Netlify Function 使用 GitHub API
    ↓
更新 GitHub 上的 user.json
    ↓
所有用戶刷新頁面時重新加載新數據 ✅
```

## 本地開發

### 設置本地環境變數

1. 在項目根目錄創建 `.env` 文件（不要提交到 Git）：
```bash
GITHUB_TOKEN=your_github_token_here
```

2. 安裝依賴並啟動伺服器：
```bash
npm install
npm start
```

3. 訪問 `http://localhost:3000`

### 測試排行榜更新

1. 完成一個測驗
2. 檢查你的 GitHub 倉庫 - `user.json` 應該已更新
3. 刷新頁面，排行榜應該顯示最新數據

## 故障排除

### "缺少 GITHUB_TOKEN 環境變數"
- 確保在 Netlify 環境變數中設置了 `GITHUB_TOKEN`
- 重新部署網站

### "GitHub API 錯誤"
- 檢查 token 是否有效
- 檢查 GitHub 倉庫名稱和所有者是否正確
- 查看 Netlify 函數日誌

### 排行榜沒有更新
- 嘗試硬刷新瀏覽器（Ctrl+Shift+R）
- 檢查瀏覽器控制台是否有錯誤
- 驗證 token 的權限是否包含 `repo`

## 安全注意事項

⚠️ **不要在代碼中硬編碼 token！**
- 始終使用環境變數
- GitHub token 應該保密
- 定期輪換 token

## 架構圖

```
用戶 (Netlify)
    ↓
index.html (React 應用)
    ↓
.netlify/functions/update-users.js
    ↓
GitHub API
    ↓
GitHub 倉庫 (user.json)
    ↓
所有用戶讀取最新數據
```

## FAQ

**Q: 為什麼使用 GitHub 而不是數據庫？**
A: 節省成本和複雜性，對於中小型應用足夠。

**Q: 更新會延遲嗎？**
A: 通常在 1-2 秒內同步，用戶需要刷新頁面看到更新。

**Q: 如果 GitHub 宕機怎麼辦？**
A: 排行榜數據備份在用戶的 localStorage 中，應用仍能正常工作。

**Q: 能否實時更新（不刷新頁面）？**
A: 可以，需要添加輪詢或 WebSocket（更高級的實現）。

