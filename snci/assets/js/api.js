// api.js - Secure, working backend connector for SambaNova
const BACKEND_URL = 'https://falling-queen-f2d7.dhimanparas605.workers.dev/api/chat';

class APIHandler {
    async sendMessage(message) {
        // ✅ Send EXACTLY what your Worker expects
        const payload = {
            prompt: message,
            mode: 'study' // Use 'study', 'code', or 'doubt'
        };

        console.log('📤 Sending to AI:', payload);
        
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('🤖 Backend error:', response.status, errorText);
            throw new Error(`AI service error: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ AI Response:', data);
        return data.response || 'No response from AI';
    }

    async simulateStreaming(response, callback) {
        const words = response.split(' ');
        let currentText = '';
        for (let i = 0; i < words.length; i++) {
            currentText += words[i] + ' ';
            callback(currentText.trim());
            await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 40));
        }
    }
}

const apiHandler = new APIHandler();
