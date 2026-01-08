// api.js - Backend Communication

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
            console.error('API Error:', error);
            aiState.updateStatus('Error');
            
            // Simulate recovery
            setTimeout(() => aiState.updateStatus('Online'), 2000);
            
            throw error;
        }
    }

    async makeRequest(message, attempt = 1) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: message,
                    mode: aiState.responseMode || 'study'
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.response || data.message || 'No response from AI';
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (attempt < this.retryAttempts && !controller.signal.aborted) {
                console.log(`Retry attempt ${attempt}`);
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                return this.makeRequest(message, attempt + 1);
            }
            
            throw error;
        }
    }

    // Simulate streaming for better UX
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
   
    console.error('❌ FULL API ERROR:', error.message, error.stack);
    
    aiState.updateStatus('Error');
    setTimeout(() => aiState.updateStatus('Online'), 2000);
    throw error;
  }

}

const apiHandler = new APIHandler();

