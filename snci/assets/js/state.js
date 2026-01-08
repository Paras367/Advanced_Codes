// state.js - AI State Management

class AIState {
    constructor() {
        this.status = 'Online';
        this.modelMode = 'Hybrid';
        this.personality = 50; // 0-100
        this.responseMode = 'Detailed';
        this.memoryEnabled = true;
        this.conversation = [];
        this.userPreferences = {
            theme: 'dark',
            soundEnabled: false,
            privacyMode: false
        };
        this.loadFromStorage();
    }

    updateStatus(status) {
        this.status = status;
        this.saveToStorage();
        this.updateUI();
    }

    updateModelMode(mode) {
        this.modelMode = mode;
        this.saveToStorage();
        this.updateUI();
    }

    setPersonality(value) {
        this.personality = value;
        this.saveToStorage();
    }

    setResponseMode(mode) {
        this.responseMode = mode;
        this.saveToStorage();
    }

    toggleMemory() {
        this.memoryEnabled = !this.memoryEnabled;
        this.saveToStorage();
    }

    addMessage(message) {
        this.conversation.push(message);
        if (!this.memoryEnabled && this.conversation.length > 10) {
            this.conversation.shift();
        }
        this.saveToStorage();
    }

    clearConversation() {
        this.conversation = [];
        this.saveToStorage();
    }

    updatePreference(key, value) {
        this.userPreferences[key] = value;
        this.saveToStorage();
    }

    loadFromStorage() {
        const saved = localStorage.getItem('snci-state');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(this, data);
        }
    }

    saveToStorage() {
        localStorage.setItem('snci-state', JSON.stringify({
            status: this.status,
            modelMode: this.modelMode,
            personality: this.personality,
            responseMode: this.responseMode,
            memoryEnabled: this.memoryEnabled,
            conversation: this.conversation,
            userPreferences: this.userPreferences
        }));
    }

    updateUI() {
        // Update status bar
        document.getElementById('ai-status').textContent = this.status;
        document.getElementById('model-mode').textContent = this.modelMode;

        // Add glow effects based on status
        const statusBar = document.querySelector('.status-glow');
        if (this.status === 'Thinking' || this.status === 'Responding') {
            statusBar.classList.add('processing');
        } else {
            statusBar.classList.remove('processing');
        }
    }

    getAIMood() {
        if (this.personality < 30) return '🤔 Analytical';
        if (this.personality > 70) return '🚀 Creative';
        return '📚 Informative';
    }
}

const aiState = new AIState();