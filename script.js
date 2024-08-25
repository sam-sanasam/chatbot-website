document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const userInput = document.getElementById('user-input').value;
    const responseBox = document.getElementById('response-box');
    const chatBox = document.getElementById('chat-box');

    // Display user input
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${userInput}`;
    responseBox.appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Fetch response from AWS API Gateway
    try {
        const response = await fetch('YOUR_AWS_API_GATEWAY_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: userInput })
        });
        const data = await response.json();

        // Display bot response
        const botMessage = document.createElement('div');
        botMessage.textContent = `Bot: ${data.answer}`;
        responseBox.appendChild(botMessage);
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = `Bot: Sorry, there was an error.`;
        responseBox.appendChild(errorMessage);
    }

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
});
