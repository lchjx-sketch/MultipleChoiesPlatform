// 通過 GitHub API 更新 user.json
// 這樣所有用戶都能同步看到排行榜數據

exports.handler = async (event, context) => {
    // CORS 處理
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    // 只允許 POST 請求
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: '方法不允許' })
        };
    }

    try {
        const updatedUsers = JSON.parse(event.body);
        const token = process.env.GITHUB_TOKEN;
        const owner = 'lchjx-sketch';
        const repo = 'MultipleChoiesPlatform';
        const filePath = 'user.json';
        const branch = 'main';

        if (!token) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: '缺少 GITHUB_TOKEN 環境變數',
                    message: '請在 Netlify 環境變數中設置 GITHUB_TOKEN'
                })
            };
        }

        // 1. 獲取當前文件的 SHA（用於更新）
        const getShaUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
        const getShaResponse = await fetch(getShaUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+raw'
            }
        });

        let sha = null;
        if (getShaResponse.ok) {
            const fileData = await getShaResponse.json();
            sha = fileData.sha;
        }

        // 2. 更新文件
        const updateUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
        const content = Buffer.from(JSON.stringify(updatedUsers, null, 2)).toString('base64');

        const updateResponse = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update leaderboard: ${new Date().toLocaleString('zh-TW')}`,
                content: content,
                branch: branch,
                ...(sha && { sha: sha })
            })
        });

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            console.error('GitHub API 錯誤:', errorData);
            throw new Error(`GitHub API 錯誤: ${errorData.message}`);
        }

        const result = await updateResponse.json();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: '排行榜已同步到 GitHub',
                commit: result.commit.sha
            })
        };

    } catch (error) {
        console.error('錯誤:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: '處理失敗',
                message: error.message
            })
        };
    }
};
