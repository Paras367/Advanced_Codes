// main.js - Main application logic
document.addEventListener('DOMContentLoaded', function() {
    console.log('Educational Platform loaded');

    // Initialize clipboard for code copying (if any code blocks are added later)
    const clipboard = new ClipboardJS('.copy-btn');

    clipboard.on('success', function(e) {
        e.trigger.textContent = 'Copied!';
        setTimeout(() => {
            e.trigger.textContent = 'Copy';
        }, 2000);
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        console.error('Copy failed');
    });

    // Add any global event listeners or initializations here
    window.addEventListener('resize', debounce(function() {
        // Handle resize events
        console.log('Window resized');
    }, 250));
});