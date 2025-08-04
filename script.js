function respond() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage("You: " + message, "user");
  input.value = "";

  // Simulate typing...
  setTimeout(() => {
    addMessage("🤖 Chatbot: I am a simple bot. You said — " + message, "bot");
  }, 500);
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
