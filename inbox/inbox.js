document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatHistory = document.getElementById('chatHistory');

    // Функція відправки повідомлення
    function sendMessage() {
        const text = messageInput.value.trim();

        if (text !== '') {
            const now = new Date();
            const timeString = now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

            const messageHTML = `
                <div class="message outgoing">
                    <div class="message-content">
                        <div class="bubble">${text}</div>
                        <span class="time">${timeString}</span>
                    </div>
                    <div class="avatar manager-avatar"><i class="fa-solid fa-user"></i></div>
                </div>
            `;

            chatHistory.insertAdjacentHTML('beforeend', messageHTML);
            messageInput.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }

    if(sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if(messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Інтерактивність каналів (зліва)
    const channelItems = document.querySelectorAll('.channel-item');
    channelItems.forEach(item => {
        item.addEventListener('click', () => {
            channelItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});