const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
let welcomeMessageReceived = false;

username = uuidv4();
console.log(username, name);

const socket = io();
// Join chatroom
socket.emit('userJoined', {
    username
});

//Message from server
socket.on('message', message => {
    console.log(`Received message from server ${JSON.stringify(message)}`);
    outputMessage(message);
    welcomeMessageReceived = true;
    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //Get message text
    const msg = event.target.elements.msg.value;

    //Emit message to server
    socket.emit('chatMessage', msg);
    console.log(`Sent a chat message to the server: ${msg}`);

    //cle ar input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    if (message.username === username) {
        div.innerHTML = `<div class="userMessage">${message.text}</div>`;
        div.classList.add("userMessageContainer");
    } else {
        div.innerHTML = `<div class="staffMessage">${message.text}</div>`;
        div.classList.add("staffMessageContainer");
    }
    chatMessages.appendChild(div);
}

function clearMessages() {
    chatMessages.innerHTML = "";
}

function toggleChatBox() {
    if (isChatboxOpen()) {
        closeChatBox();
    } else {
        openChatBox();
    }
}

function isChatboxOpen() {
    return document.querySelector(".chat-container").style.display === "block";
}

function openChatBox() {
    document.querySelector(".chat-container").style.display = "block";
}

function closeChatBox() {
    document.querySelector(".chat-container").style.display = "none";
}
