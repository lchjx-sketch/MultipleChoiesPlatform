// 這是一個示例函數，實際部署時需要使用數據庫
// 推薦使用：Firebase、Supabase 或 MongoDB

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

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: '方法不允許' })
        };
    }

    try {
        const updatedUsers = JSON.parse(event.body);
        
        // 在實際部署中，這裡應該保存到數據庫
        // 目前只是記錄到日誌
        console.log('更新用戶數據:', JSON.stringify(updatedUsers, null, 2));
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: '排行榜數據已記錄',
                data: updatedUsers
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: '處理失敗: ' + error.message })
        };
    }
};
