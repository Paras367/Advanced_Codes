// ui.js - UI Effects and Interactions

class UIHandler {
    constructor() {
        this.sidePanelOpen = false;
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupSidePanel();
        this.setupAnimations();
        this.addParticles();
    }

    setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            aiState.updatePreference('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    }

    setupSidePanel() {
        // Toggle side panel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidePanelOpen) {
                this.toggleSidePanel();
            }
        });

        // Add toggle button if needed, for now manual
        const panel = document.getElementById('side-panel');
        // You can add a button to toggle it
    }

    toggleSidePanel() {
        const panel = document.getElementById('side-panel');
        this.sidePanelOpen = !this.sidePanelOpen;
        
        if (this.sidePanelOpen) {
            panel.classList.remove('translate-x-full');
        } else {
            panel.classList.add('translate-x-full');
        }
    }

    setupAnimations() {
        // Add hover effects
        document.querySelectorAll('.hover-glow').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('glow');
            });
            el.addEventListener('mouseleave', () => {
                el.classList.remove('glow');
            });
        });
    }

    addParticles() {
        // Simple particle effect
        const particleContainer = document.createElement('div');
        particleContainer.className = 'fixed inset-0 pointer-events-none z-0';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-cyan-400 opacity-30 rounded-full';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particleContainer.appendChild(particle);
        }

        // Add CSS for float animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); }
                100% { transform: translateY(-100vh) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    showTypingIndicator() {
        document.getElementById('typing-indicator').classList.remove('hidden');
    }

    hideTypingIndicator() {
        document.getElementById('typing-indicator').classList.add('hidden');
    }

    scrollToBottom() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    addMessage(message, isUser = false) {
        const messagesContainer = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-enter flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`;
        
        const content = `
            <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isUser ? 'bg-purple-600 text-white' : 'bg-gray-700 text-cyan-400'} glow">
                ${isUser ? '<i class="fas fa-user mr-2"></i>' : '<div class="ai-avatar w-8 h-8 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></div>'}
                <span>${message}</span>
                ${!isUser ? '<span class="ml-2 text-xs opacity-50">' + aiState.getAIMood() + '</span>' : ''}
            </div>
        `;
        
        messageDiv.innerHTML = content;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    updateStatusBar() {
        // Already handled in state.js
    }

    playSound(type) {
        if (!aiState.userPreferences.soundEnabled) return;
        
        // Simple beep sound (you can replace with actual audio files)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(type === 'send' ? 800 : 600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

const uiHandler = new UIHandler();