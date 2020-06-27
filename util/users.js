const users = [];

const staffUsers = [];

function staffUserJoin(id, username) {
    const staffUser = {id, username}

    staffUsers.push(staffUser);

    return staffUser;
}

// Join chat to chat
function userJoin(id, username) {
    const user = {id, username};

    users.push(user);

    return user;
}

// Get current chat
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}


//User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

function getUsers(){
    return users;
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    staffUserJoin,
    getUsers
}
