const API_KEY = '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'; // Replace with your API key
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    userInput.value = '';

    // Show typing indicator
    typingIndicator.style.display = 'block';
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        
        // Hide typing indicator and add bot response
        typingIndicator.style.display = 'none';
        addMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error:', error);
        typingIndicator.style.display = 'none';
        addMessage('Sorry, I encountered an error.', 'bot');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function navigateToPage(page) {
    // Validate the input page to ensure safe navigation
    if (page && typeof page === 'string') {
        window.location.href = page;
    } else {
        console.error('Invalid page URL');
    }
}

