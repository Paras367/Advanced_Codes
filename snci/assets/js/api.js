
const BACKEND_URL = 'https://falling-queen-f2d7.dhimanparas605.workers.dev/api/chat';

async function sendMessageToAI(message) {
    console.log('📤 Sending:', { prompt: message, mode: 'study' });
    
    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message, mode: 'study' })
    });

    if (!response.ok) throw new Error('Backend error');
    const data = await response.json();
    return data.response;
}
