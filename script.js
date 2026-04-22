// ========== SETTINGS ==========
const BOT_NAME = "SmartBot";
let soundEnabled = true;
let darkMode = false;

// ========== INIT ==========
window.onload = function () {
  detectSystemDarkMode();
  showWelcomeMessage();
};

function detectSystemDarkMode() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark');
    darkMode = true;
  }
}

function showWelcomeMessage() {
  setTimeout(() => {
    addMessage(`👋 Hello! I'm <strong>${BOT_NAME}</strong>, your smart assistant.<br>Ask me anything — I'm here to help!`, "bot");
  }, 500);
}

// ========== RESPOND ==========
function respond() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  const typingId = "typing-indicator";
  addTypingIndicator(typingId);

  setTimeout(() => {
    removeTypingIndicator(typingId);
    const reply = getBotReply(message);
    addMessage(reply, "bot");
    if (soundEnabled) playSound();
  }, 1000);
}

function quickReply(text) {
  document.getElementById("userInput").value = text;
  respond();
}

// ========== BOT REPLIES ==========
function getBotReply(message) {
  const msg = message.toLowerCase();

  // Greetings
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
    return "Hello there! 👋 How can I assist you today?";
  if (msg.includes("bye") || msg.includes("goodbye"))
    return "Goodbye! 👋 Have an amazing day!";
  if (msg.includes("how are you"))
    return "I'm doing great, thanks for asking! 😊 How about you?";
  if (msg.includes("good morning"))
    return "Good morning! ☀️ Hope you have a wonderful day ahead!";
  if (msg.includes("good night"))
    return "Good night! 🌙 Sweet dreams!";

  // Help
  if (msg.includes("help") || msg.includes("what can you do"))
    return `I can help you with:<br>
    ⏰ Current time & date<br>
    😂 Jokes<br>
    🧮 Simple math<br>
    🌦️ Weather info<br>
    💬 General chat<br>
    Just ask me anything!`;

  // Time & Date
  if (msg.includes("time")) {
    const now = new Date();
    return "⏰ Current time: <strong>" + now.toLocaleTimeString() + "</strong>";
  }
  if (msg.includes("date") || msg.includes("today")) {
    const today = new Date();
    return "📅 Today is: <strong>" + today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + "</strong>";
  }

  // Jokes
  if (msg.includes("joke") || msg.includes("funny")) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄",
      "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
      "I told my computer I needed a break... Now it won't stop sending me Kit-Kat ads! 🍫",
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "What do you call a fake noodle? An impasta! 🍝"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Math
  if (msg.includes("calculate") || msg.includes("math") || msg.includes("what is") && /[\d+\-*/]/.test(msg)) {
    try {
      const expression = msg.replace(/what is|calculate|math/gi, '').trim();
      const result = Function('"use strict"; return (' + expression + ')')();
      if (!isNaN(result)) return `🧮 Result: <strong>${expression} = ${result}</strong>`;
    } catch (e) {}
  }

  // Weather
  if (msg.includes("weather"))
    return "🌦️ I can't check live weather yet, but you can check <a href='https://weather.com' target='_blank'>weather.com</a> for accurate forecasts!";

  // Bot identity
  if (msg.includes("who are you") || msg.includes("your name") || msg.includes("what are you"))
    return `🤖 I'm <strong>${BOT_NAME}</strong>, a smart chatbot assistant built with HTML, CSS & JavaScript. Created by <strong>Ahmad Lashari</strong>!`;

  if (msg.includes("who made you") || msg.includes("your creator") || msg.includes("who built you"))
    return "👨‍💻 I was built by <strong>Ahmad Lashari</strong>, a web developer from Pakistan! 🇵🇰";

  // Compliments
  if (msg.includes("thank") || msg.includes("thanks"))
    return "You're welcome! 😊 Happy to help anytime!";
  if (msg.includes("good bot") || msg.includes("smart") || msg.includes("awesome"))
    return "Aww, thank you! 😊 You're pretty awesome yourself!";

  // Default
  const defaults = [
    `Hmm, interesting! Tell me more about "${message}" 🤔`,
    `I'm still learning! I don't quite understand "${message}" yet. Try asking something else?`,
    `That's a great question! Unfortunately I don't have an answer for that yet. 😅`,
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ========== UI FUNCTIONS ==========
function addTypingIndicator(id) {
  const chatbox = document.getElementById("chatbox");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot typing";
  typingDiv.id = id;
  typingDiv.innerHTML = `<span></span><span></span><span></span>`;
  chatbox.appendChild(typingDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");
  const msgDiv = document.createElement("div");
  msgDiv.className = "message " + sender;
  msgDiv.innerHTML = convertEmojis(text);
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function convertEmojis(text) {
  return text
    .replace(/:\)/g, "🙂")
    .replace(/:D/g, "😄")
    .replace(/:\(/g, "😢")
    .replace(/<3/g, "❤️")
    .replace(/:o/gi, "😮")
    .replace(/:p/gi, "😛");
}

function handleKey(event) {
  if (event.key === "Enter") respond();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  darkMode = !darkMode;
}

function clearChat() {
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = "";
  showWelcomeMessage();
}

function downloadChat() {
  const messages = document.querySelectorAll('.message');
  let chatText = `Chat History — ${BOT_NAME}\n`;
  chatText += `Date: ${new Date().toLocaleString()}\n`;
  chatText += "=".repeat(40) + "\n\n";
  messages.forEach(msg => {
    const sender = msg.classList.contains('user') ? 'You' : BOT_NAME;
    chatText += `${sender}: ${msg.innerText}\n\n`;
  });
  const blob = new Blob([chatText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'chat-history.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById("soundBtn").textContent = soundEnabled ? "🔔" : "🔕";
}

function playSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = 520;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch(e) {}
}
