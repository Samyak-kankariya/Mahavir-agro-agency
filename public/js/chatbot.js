document.addEventListener("DOMContentLoaded", function () {
    // Dynamically detect API URL
    const baseURL = location.hostname === "localhost"
    ? "http://127.0.0.1:5000/chat" : "https://mahavir-agro-agency-chatbot.onrender.com/chat";

    const chatBtn = document.createElement("button");
    chatBtn.innerText = "Chat with us";
    chatBtn.classList.add("chat-btn");
    document.body.appendChild(chatBtn);

    const chatBox = document.createElement("div");
    chatBox.classList.add("chat-box");
    chatBox.innerHTML = `
        <div class="chat-header">Chatbot <span class="close-chat">×</span></div>
        <div class="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Type your message...">
        <button id="send-chat">Send</button>
    `;
    document.body.appendChild(chatBox);

    chatBtn.addEventListener("click", () => chatBox.classList.toggle("active"));
    chatBox.querySelector(".close-chat").addEventListener("click", () => chatBox.classList.remove("active"));

    document.getElementById("send-chat").addEventListener("click", async () => {
        const input = document.getElementById("chat-input");
        const userMessage = input.value.trim();
        if (!userMessage) return;

        const chatMessages = document.querySelector(".chat-messages");
        chatMessages.innerHTML += `<div class="user-message">${userMessage}</div>`;
        input.value = "";

        try {
            const res = await fetch(baseURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });
            

            const data = await res.json();
            chatMessages.innerHTML += `<div class="bot-message">${data.response}</div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch {
            chatMessages.innerHTML += `<div class="bot-message">Server error. Try again.</div>`;
        }
    });
});
