const socket = io();

// DOM elements
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');

// Send chat message
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', message); // Send message to server
        messageInput.value = ''; // Clear the input field
    }
});

// Receive and display messages
socket.on('message', (message) => {
    const div = document.createElement('div');
    div.textContent = message;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
});
