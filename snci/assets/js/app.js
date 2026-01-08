// app.js - Main Application Logic (WORKING VERSION)
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialState();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        const input = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendButton.addEventListener('click', () => this.sendMessage());

        // Side panel controls
        const modeSelect = document.querySelector('#side-panel select');
        if (modeSelect) {
            modeSelect.addEventListener('change', (e) => {
                // Optional: update mode in future
                console.log('Mode changed to:', e.target.value);
            });
        }

        const memoryToggle = document.getElementById('memory-toggle');
        if (memoryToggle) {
            memoryToggle.addEventListener('change', (e) => {
                aiState.memoryEnabled = e.target.checked;
                aiState.saveToStorage();
            });
        }

        // Export and clear buttons
        const buttons = document.querySelectorAll('#side-panel button');
        if (buttons[2]) buttons[2].addEventListener('click', () => this.exportChat());
        if (buttons[3]) buttons[3].addEventListener('click', () => this.clearSession());
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        uiHandler.addMessage(message, true);
        input.value = '';
        uiHandler.showTypingIndicator();

        try {
            const response = await apiHandler.sendMessage(message);
            
            // Simulate streaming
            let hasAdded = false;
            await apiHandler.simulateStreaming(response, (text) => {
                if (!hasAdded) {
                    uiHandler.addMessage(text, false);
                    hasAdded = true;
                } else {
                    // Update last AI message
                    const lastAiMsg = document.querySelector('#messages .justify-start:last-child span');
                    if (lastAiMsg) lastAiMsg.textContent = text;
                }
                uiHandler.scrollToBottom();
            });

        } catch (error) {
            console.error('❌ App Error:', error);
            uiHandler.addMessage('Sorry, I encountered an error. Please try again.', false);
        } finally {
            uiHandler.hideTypingIndicator();
        }
    }

    loadInitialState() {
        // Restore conversation from localStorage
        if (aiState.conversation.length > 0) {
            aiState.conversation.forEach(msg => {
                uiHandler.addMessage(msg.content, msg.role === 'user');
            });
        }
    }

    addWelcomeMessage() {
        if (aiState.conversation.length === 0) {
            setTimeout(() => {
                uiHandler.addMessage(
                    'Welcome to SoftwareLabs Neural AI Interface v2026. ' +
                    'I am your advanced AI assistant. How can I help you today?',
                    false
                );
            }, 800);
        }
    }

    exportChat() {
        const chatData = aiState.conversation.map(msg => 
            `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`
        ).join('\n\n');
        
        const blob = new Blob([chatData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'neural-chat-export.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    clearSession() {
        if (confirm('Clear entire conversation?')) {
            aiState.conversation = [];
            aiState.saveToStorage();
            document.getElementById('messages').innerHTML = '';
            this.addWelcomeMessage();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
