// GitHub 配置
// 將此文件複製並填入你的 GitHub 信息

const GITHUB_CONFIG = {
  owner: 'lchjx-sketch',           // 你的 GitHub 用戶名
  repo: 'MultipleChoiesPlatform',  // 你的倉庫名
  filePath: 'user.json',           // 要更新的文件路徑
  branch: 'main',                  // 分支名
  token: 'YOUR_GITHUB_TOKEN'       // GitHub Personal Access Token
};

// 如何獲得 GitHub Token：
// 1. 訪問 https://github.com/settings/tokens
// 2. 點擊 "Generate new token"
// 3. 選擇 "repo" 權限
// 4. 複製 token 並粘貼到這裡
// 5. 在 Netlify 環境變數中設置為 GITHUB_TOKEN

export default GITHUB_CONFIG;
