function respond() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  // Show user message
  addMessage("You: " + message, "user");
  input.value = "";

  // Show "typing..." message
  const typingId = "typing-indicator";
  addTypingIndicator(typingId);

  // After delay, remove typing and show bot reply
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const reply = getBotReply(message);
    addMessage("🤖 Chatbot: " + reply, "bot");
  }, 1000);
}

// Add a temporary typing message
function addTypingIndicator(id) {
  const chatbox = document.getElementById("chatbox");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot";
  typingDiv.id = id;
  typingDiv.textContent = "🤖 Bot is typing...";
  chatbox.appendChild(typingDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Remove it when reply is ready
function removeTypingIndicator(id) {
  const typingDiv = document.getElementById(id);
  if (typingDiv) typingDiv.remove();
}

// Smart reply system (basic)
function getBotReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I assist you?";
  if (msg.includes("bye")) return "Goodbye! Have a great day!";
  if (msg.includes("help")) return "I'm here to help! Just ask me anything.";
  return "I am just a simple bot. You said — " + message;
}


function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");
  const msgDiv = document.createElement("div");
  msgDiv.className = "message " + sender;
  msgDiv.textContent = text;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function handleKey(event) {
  if (event.key === "Enter") {
    respond();
  }
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
