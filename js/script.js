document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    // Display user's message
    const outputDiv = document.getElementById('output');
    const userMessage = `<p class="user-msg">${userInput}</p>`;
    outputDiv.innerHTML += userMessage;

    // Send message to backend (AWS Lambda)
    fetch('https://your-lambda-endpoint.amazonaws.com/dev/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot's response
        const botMessage = `<p class="bot-msg">${data.response}</p>`;
        outputDiv.innerHTML += botMessage;
        document.getElementById('user-input').value = ''; // Clear input field
    })
    .catch(error => console.error('Error:', error));
}

function saveSession() {
    const chatHistory = document.getElementById('output').innerHTML;
    localStorage.setItem('chatSession', chatHistory);
}

function loadSession() {
    const savedSession = localStorage.getItem('chatSession');
    if (savedSession) {
        document.getElementById('output').innerHTML = savedSession;
    }
}

// Load session on page load
window.onload = loadSession;

// Save session on page unload
window.onbeforeunload = saveSession;
