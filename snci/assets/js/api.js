// api.js - Fixed for SambaNova + Your UI
const BACKEND_URL = 'https://falling-queen-f2d7.dhimanparas605.workers.dev/api/chat';

class APIHandler {
    constructor() {
        this.timeout = 30000;
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
            console.error('❌ API ERROR:', error);
            aiState.updateStatus('Error');
            setTimeout(() => aiState.updateStatus('Online'), 2000);
            throw error;
        }
    }

    // 🔑 CRITICAL: Convert UI modes to valid backend modes
    getValidMode() {
        const mode = aiState.responseMode;
        if (!mode) return 'study';
        
        // Map your UI values to backend values
        if (mode.includes('Code') || mode.includes('Technical')) return 'code';
        if (mode.includes('Doubt') || mode.includes('Question')) return 'doubt';
        return 'study'; // Default for "Short", "Detailed", "Study", etc.
    }

    async makeRequest(message, attempt = 1) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        // ✅ Always send 'prompt' + valid mode
        const payload = {
            prompt: message,
            mode: this.getValidMode()
        };

        console.log('📤 Sending:', payload); // Debug

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const text = await response.text();
                console.error('🤖 Backend error:', response.status, text);
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Success:', data);
            return data.response || 'No response from AI';
            
        } catch (error) {
            clearTimeout(timeoutId);
            if (attempt < this.retryAttempts && !controller.signal.aborted) {
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                return this.makeRequest(message, attempt + 1);
            }
            throw error;
        }
    }

    async simulateStreaming(response, callback) {
        const words = response.split(' ');
        let current = '';
        for (let i = 0; i < words.length; i++) {
            current += words[i] + ' ';
            callback(current.trim());
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        }
    }
}

const apiHandler = new APIHandler();
