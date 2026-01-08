// app.js - Main Application Logic

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

        // Send message on Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Send message on button click
        sendButton.addEventListener('click', () => this.sendMessage());

        // Side panel controls
        document.querySelector('input[type="range"]').addEventListener('input', (e) => {
            aiState.setPersonality(e.target.value);
        });

        document.querySelector('select').addEventListener('change', (e) => {
            aiState.setResponseMode(e.target.value);
        });

        document.getElementById('memory-toggle').addEventListener('change', (e) => {
            aiState.toggleMemory();
        });

        // Export chat
        document.querySelector('button:nth-child(4)').addEventListener('click', () => this.exportChat());

        // Clear session
        document.querySelector('button:nth-child(5)').addEventListener('click', () => this.clearSession());

        // Toggle side panel (add a button or use key)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                uiHandler.toggleSidePanel();
            }
        });
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        uiHandler.addMessage(message, true);
        aiState.addMessage({ role: 'user', content: message });
        
        input.value = '';
        uiHandler.playSound('send');
        
        // Show typing indicator
        uiHandler.showTypingIndicator();
        
        try {
            aiState.updateStatus('Responding');
            const response = await apiHandler.sendMessage(message);
            
            // Simulate streaming
            let currentText = '';
            await apiHandler.simulateStreaming(response, (text) => {
                if (currentText) {
                    // Update last AI message
                    const lastMessage = document.querySelector('#messages .justify-start:last-child span');
                    if (lastMessage) lastMessage.textContent = text;
                } else {
                    uiHandler.addMessage(text);
                }
                currentText = text;
            });
            
            aiState.addMessage({ role: 'assistant', content: response });
            
        } catch (error) {
            uiHandler.addMessage('Sorry, I encountered an error. Please try again.', false);
            console.error(error);
        } finally {
            uiHandler.hideTypingIndicator();
            aiState.updateStatus('Online');
        }
    }

    loadInitialState() {
        // Load conversation from state
        aiState.conversation.forEach(msg => {
            uiHandler.addMessage(msg.content, msg.role === 'user');
        });
    }

    addWelcomeMessage() {
        if (aiState.conversation.length === 0) {
            setTimeout(() => {
                uiHandler.addMessage('Welcome to SoftwareLabs Neural AI Interface v2026. I am your advanced AI assistant. How can I help you today?', false);
            }, 1000);
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
        a.download = 'snci-chat-export.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    clearSession() {
        if (confirm('Are you sure you want to clear the conversation?')) {
            aiState.clearConversation();
            document.getElementById('messages').innerHTML = '';
            this.addWelcomeMessage();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});