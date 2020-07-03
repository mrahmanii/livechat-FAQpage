const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById('users');

let usersMap = new Map();

let currentUser = null;

//Haal gebruiksnaam en ruimte op van URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
userid = uuidv4();

console.log(username, name, userid);

const socket = io();
// Word lid van de chatroom
socket.emit('staffJoined', {
    username
});

socket.on('userJoined', function ({user, time}) {
    console.log(`A new user has joined ${user.id}, ${user.username}, ${time}`);
    let userObj = {id: user.id, username: user.username, time: time, messages: []};
    usersMap.set(user.id, userObj);
    console.log("Added a new chat " + JSON.stringify(usersMap.get(user.id)));
})


//Krijg alle gebruikers
socket.on('roomusers', (users) => {
    outputUsers(users);
});

//Bericht van server
socket.on('message', message => {
    console.log(`Received message from server ${JSON.stringify(message)}`);
    usersMap.get(message.id).messages.push({username: message.username, time: message.time, message: message.text});

    console.log(JSON.stringify(usersMap.get(message.id)));
    //outputMessage(message);
    renderMessages();

    //Naar beneden scrollen
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Bericht verzenden
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //Ontvang berichttekst
    const msg = event.target.elements.msg.value;

    //Stur bericht naar server
    if(currentUser) {
        let data = {id: currentUser.id, staffUserId: userid, username: username, message: msg};
        console.log(`Sending data ${JSON.stringify(data)} to server`);
        socket.emit('staffReplyMessage', data);

        //clear input
        event.target.elements.msg.value = '';
        event.target.elements.msg.focus();
    }
    else {
        alert('select a chat');
    }
});

//Voeg gebruikers toe aan DOM
function outputUsers({users}) {
    userList.innerHTML = `${users.map(user => `<li><a href="#" onclick="showMessage('${user.id}')">${user.username}</a></li>`).join('')}`;

    for(let i = 0; i < users.length; i++) {
        let user = users[i];
        if(!usersMap.has(user.id)){
            let userObj = {id: user.id, username: user.username, time: moment().format('h:mm a') , messages: []};
            usersMap.set(user.id, userObj);
        }
    }

}

function renderMessages() {
    const template = document.getElementById("messages-template").innerHTML;
    const compiled_template = Handlebars.compile(template);
    document.querySelector('.chat-messages').innerHTML = compiled_template(currentUser);
}

//Toon berichten voor de chat
function showMessage(id) {
    console.log(`Show messages for ${id}`);
    currentUser = usersMap.get(id);
    console.log(`Current user: ${JSON.stringify(currentUser)}`);
    let messageText = document.getElementById('msg');
    messageText.removeAttribute("disabled");
    renderMessages();
}
