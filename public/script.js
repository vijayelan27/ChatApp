const socket = io("https://chatapp-ten-tau.vercel.app/"); // Connect to the backend

const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Add a message to the chat window
function addMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message on button click
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("message", message); // Send message to server
    addMessage(message, "sent"); // Display sent message
    messageInput.value = "";
  }
});

// Listen for incoming messages
socket.on("message", (message) => {
  addMessage(message, "received"); // Display received message
});
