#!/bin/bash

# 智選 Quiz Platform - Netlify 部署設置腳本

echo "════════════════════════════════════════════"
echo "智選 Quiz Platform - Netlify 部署設置"
echo "════════════════════════════════════════════"
echo ""

echo "請選擇排行榜存儲方案："
echo "1. Firebase Realtime Database (推薦)"
echo "2. 自己的 Node.js 伺服器"
echo "3. 跳過設置 (使用 localStorage)"
echo ""
read -p "請輸入選項 (1-3): " choice

case $choice in
  1)
    echo ""
    echo "Firebase 設置步驟："
    echo "1. 訪問 https://console.firebase.google.com/"
    echo "2. 創建新項目"
    echo "3. 啟用 Realtime Database"
    echo "4. 複製你的 Firebase 配置"
    echo "5. 更新 firebase-config.js"
    echo ""
    echo "cp firebase-config-template.js firebase-config.js"
    echo "# 然後編輯 firebase-config.js，填入你的配置信息"
    ;;
  2)
    echo ""
    echo "自己的伺服器設置："
    echo "1. 部署 server.js 到你的伺服器（Heroku, Railway 等）"
    echo "2. 在 index.html 中更新 API 端點"
    echo "3. 將 updateUserHighestScore 函數中的 URL 改為你的伺服器地址"
    ;;
  3)
    echo ""
    echo "警告：使用 localStorage 將無法保存排行榜數據！"
    echo "Netlify 部署時排行榜只會在瀏覽器本地存儲。"
    ;;
esac

echo ""
echo "════════════════════════════════════════════"
echo "部署檢查清單："
echo "════════════════════════════════════════════"
echo "□ 確認 netlify.toml 存在"
echo "□ 確認 netlify/functions/ 目錄存在"
echo "□ 如使用 Firebase，確認 firebase-config.js 已配置"
echo "□ 運行 git add . && git commit -m 'Deploy setup'"
echo "□ 推送到 GitHub: git push"
echo "□ 在 Netlify 上連接你的 GitHub 倉庫"
echo ""
