const path = require('path');
const http = require('http');
const express = require('express');

const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const mysql = require('mysql');
const connectionURI = {
    host: '45.87.80.205',
    port: 3306,
    user: 'u657149837_chatuser',
    password: 'palesmoke92',
    database: 'u657149837_chat'
};


const {formatMessage, formatLongMessage, formatUserDetails} = require('./util/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    staffUserJoin,
    getUsers
} = require('./util/users');

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

let botName = 'Library App';

// Run when the client connects
io.on('connection', socket => {

    socket.on('staffJoined', ({username}) => {
        const user = staffUserJoin(socket.id, username);
        console.log(`A new staff has logged in ${JSON.stringify(user)}`);

        socket.join('staff');
        console.log(`${username} has joined the room staff`);

        // Send users and room info
        io.to('staff').emit('roomusers', {
            users: getUsers()
        });
    });

    socket.on('userJoined', ({username}) => {
        const user = userJoin(socket.id, username);
        console.log(`A new user has logged in ${JSON.stringify(user)}`);

        console.log(`The user ${username} has joined a room with id: ${user.id}`);
        socket.join(user.id);

        socket.broadcast.to('staff').emit('userJoined', formatUserDetails(user));

        console.log((`Welcome message sent to the user ${username}`));
        // socket.emit('message', formatMessage(botName, `Welcome to the Library ${username}`));
        socket.emit('message', formatMessage(botName, `Hallo daar. Kijk maar even rond! Laat het ons weten als je vragen hebt.`));

        // Send users and room info
        io.to('staff').emit('roomusers', {
            users: getUsers()
        })

        console.log(`Broadcast to a room with id ${user.id}`);
        socket.broadcast.to(user.id).emit('message', formatMessage(botName, `${username} has joined the chat`));
    })

    //Listen for chatMessage from the chat
    socket.on('chatMessage', (message) => {
        const user = getCurrentUser(socket.id);
        console.log(`Chat message: ${message}`);

        console.log(`Sending to the room ${user.id} the message ${message}`)
        io.to(user.id).emit('message', formatLongMessage(user.id, user.username, message));
        console.log(`Sending to the room 'staff' the message ${message}`)
        io.to('staff').emit('message', formatLongMessage(user.id, user.username, message));

        let stmt = `INSERT INTO messages(user_id, user_name, sent_time, direction, message)
            VALUES(?,?,?,?,?)`;
        let msg = [user.id, user.username, new Date(), 'from', message];

        let connection = mysql.createConnection(connectionURI);
        // execute the insert statment
        connection.query(stmt, msg, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // get inserted id
            console.log('message Id:' + results.insertId);
            connection.end(function (err) {
                console.log(err);
            });
        });

    });

    //Listen for chatMessage from the staff
    socket.on('staffReplyMessage', (data) => {
        console.log(`Chat message received from staff: ${JSON.stringify(data)}`);
        if (!data.id) {
            console.error("missing id");
            return;
        }
        const user = getCurrentUser(data.id);

        if (!user || !user.id) {
            console.error("missing chat");
            return;
        }

        console.log(`Sending to the room ${user.id} the message ${data.message}`)
        io.to(user.id).emit('message', formatLongMessage(user.id, data.username, data.message));
        console.log(`Sending to the room 'staff' the message ${data.message}`)
        io.to('staff').emit('message', formatLongMessage(user.id, data.username, data.message));

        let stmt = `INSERT INTO messages(staff_id, staff_name, user_id, user_name,sent_time, direction, message)
            VALUES(?,?,?,?,?,?,?)`;
        let msg = [data.staffUserId, data.username, user.id, user.username, new Date(), 'to', data.message];

        let connection = mysql.createConnection(connectionURI);

        // execute the insert statement
        connection.query(stmt, msg, (err, results, fields) => {
            if (err) {
                return console.error(err.message);
            }
            // get inserted id
            console.log('message Id:' + results.insertId);
            connection.end(function (err) {
                console.log(err);
            });
        });
    });

    //runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            io.to(user.room).emit('roomusers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

