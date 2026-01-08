// api.js - Backend Communication (FIXED FOR SAMBANOVA)

const BACKEND_URL = 'https://falling-queen-f2d7.dhimanparas605.workers.dev/api/chat';

class APIHandler {
    constructor() {
        this.timeout = 30000; // 30 seconds
        this.retryAttempts = 3;
    }

    async sendMessage(message) {
        aiState.updateStatus('Thinking');
        
        const startTime = Date.now();
        
        try {
            const response = await this.makeRequest(message);
            const endTime = Date.now();
            
            document.getElementById('response-time').textContent = `${endTime - startTime}ms`;
            aiState.updateStatus('Online');
            return response;
        } catch (error) {
            console.error('❌ FULL API ERROR:', error);
            aiState.updateStatus('Error');
            setTimeout(() => aiState.updateStatus('Online'), 2000);
            throw error;
        }
    }

    // 🔑 Maps UI modes to valid backend modes
    mapMode(uiMode) {
        const modeMap = {
            'Short': 'study',
            'Detailed': 'study',
            'Technical': 'code',
            'Study': 'study',
            'Code': 'code',
            'Doubt': 'doubt',
            'study': 'study',
            'code': 'code',
            'doubt': 'doubt'
        };
        return modeMap[uiMode] || 'study';
    }

    async makeRequest(message, attempt = 1) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        // ✅ Always send 'prompt' + valid mode
        const payload = {
            prompt: message,
            mode: this.mapMode(aiState.responseMode || 'study')
        };

        // 🔍 Debug log
        console.log('📤 Sending to AI backend:', payload);

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // 🔍 Log backend errors
            if (!response.ok) {
                const errorText = await response.text();
                console.error('🤖 Backend error response:', response.status, errorText);
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ AI Response received:', data);
            return data.response || data.message || 'No response from AI';
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (attempt < this.retryAttempts && !controller.signal.aborted) {
                console.log(`⏳ Retry attempt ${attempt} after error:`, error.message);
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                return this.makeRequest(message, attempt + 1);
            }
            
            console.error('💥 Final API failure after retries:', error);
            throw error;
        }
    }

    // Simulate streaming for better UX
    async simulateStreaming(response, callback) {
        const words = response.split(' ');
        let currentText = '';
        
        for (let i = 0; i < words.length; i++) {
            currentText += words[i] + ' ';
            callback(currentText.trim());
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        }
    }
}

const apiHandler = new APIHandler();
