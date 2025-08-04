function respond() {
  const userInput = document.getElementById("userInput").value;
  const chatbox = document.getElementById("chatbox");
  const response = "🤖 Chatbot: I am a simple bot. You said — " + userInput;

  chatbox.innerHTML += "<p>" + response + "</p>";
  document.getElementById("userInput").value = "";
}
