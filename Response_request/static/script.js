async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageDisplay = document.getElementById('messageDisplay');
    const message = messageInput.value;

    // Add visual feedback
    const sendButton = document.querySelector('button');
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';

    console.log('Attempting to send message:', message);

    if (!message) {
        alert('Please enter a message');
        sendButton.disabled = false;
        sendButton.textContent = 'Send Message';
        return;
    }

    try {
        console.log('Sending fetch request...');
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received response:', data);
        
        // Create new message elements instead of using innerHTML
        const userMessage = document.createElement('p');
        userMessage.innerHTML = `<strong>You:</strong> ${message}`;
        
        const serverMessage = document.createElement('p');
        serverMessage.innerHTML = `<strong>Server:</strong> ${data.response}`;
        
        messageDisplay.appendChild(userMessage);
        messageDisplay.appendChild(serverMessage);

        // Clear input
        messageInput.value = '';

    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message: ' + error.message);
    } finally {
        sendButton.disabled = false;
        sendButton.textContent = 'Send Message';
    }
}

// Add load event listener to verify script is loading
window.addEventListener('load', () => {
    console.log('Page fully loaded');
    // Test DOM elements
    const messageInput = document.getElementById('messageInput');
    const messageDisplay = document.getElementById('messageDisplay');
    const sendButton = document.querySelector('button');
    
    console.log('MessageInput found:', !!messageInput);
    console.log('MessageDisplay found:', !!messageDisplay);
    console.log('SendButton found:', !!sendButton);
});

// Allow sending message with Enter key
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 