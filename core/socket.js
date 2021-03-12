const socket = require('socket.io');

let {playrooms} = require("../temporaryDatabase/temporaryDatabase")
let {message} = require("../temporaryDatabase/temporaryDatabase")

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

module.exports = (http, options) => {
    const io = socket(http, options);
    io.on("connection", (socket) => {
        // -------------- комноты


        console.log("a user connected")
        // ---------- когда он заходит в комноту то он получает все даные о комнатах
        socket.on('add loadingUser', (username) => {
            socket.broadcast.emit("get playroom", playrooms)
        })

        // ----------------------------------------- создание комноты
        socket.on('add playroom', (username) => {
            let participants = []
            participants.push(username.name)
            playrooms.push({nameRoom: username.nameRoom, participants: participants, _id: socket.id,})
            socket.broadcast.emit("get playroom", playrooms)
        })

        // ------------- подсоединение
        socket.on('join user', (data) => {
            let ass = 0
            for (const person of playrooms) {
                if (person.nameRoom === data.nameRoom) {
                    if (-1 === playrooms[ass].participants.indexOf(`${data.name}`)) {
                        console.log(`${data.name}`)
                        playrooms[ass].participants.push(data.name)
                        // ----- если ктото присоединиться к комноте то показываем пользователю который ище не вашол
                        socket.broadcast.emit("get userPlayroom", data = playrooms[ass].participants)
                    }
                } else {
                    ass += 1
                }
            }

        })

        // Join a conversation
        const { roomId } = socket.handshake.query;

        socket.join(roomId);

        // Listen for new messages
        socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
            console.log(data)
            io.in(roomId).emit("0NEW_CHAT_MESSAGE_EVENT", data);
        });
        // ---------------------------------------------------
        // socket.on('ROOM:JOIN', ({roomId, userName}) => {
        //     socket.join(roomId);
        //
        //     // ============ для того что бы один человек от своего имени мог писатьиз разных сайтов
        //     let notUerName = true
        //     for (let val of rooms.get(roomId).get('users').keys()) {
        //         if (val !== userName) {
        //             notUerName = true
        //             console.log(`val: ${val}, userName: ${userName}`)
        //         } else {
        //             notUerName = false
        //         }
        //     }
        //     if (notUerName) {
        //         const arrayID = [socket.id]
        //         rooms.get(roomId).get('users').set(userName,arrayID);
        //     } else if(!notUerName){
        //         let arrayID = []
        //         for (let key of rooms.get(roomId).get('users').get(userName)) {
        //             arrayID.push(key)
        //         }
        //         arrayID.push(socket.id)
        //         rooms.get(roomId).get('users').set(userName,arrayID);
        //     }
        //
        //     // ============
        //     //rooms.get(roomId).get('users').set(socket.id, userName);
        //     //console.log(rooms.get(roomId).get('users'))
        //
        //     const users = [...rooms.get(roomId).get('users').keys()];
        //     socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
        // });
        //
        // socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
        //     const obj = {
        //         userName,
        //         text,
        //     };
        //     rooms.get(roomId).get('messages').push(obj);
        //     socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj);
        // });
        //
        // socket.on('disconnect', () => {
        //     rooms.forEach((value, roomId) => {
        //         if (value.get('users').delete(socket.id)) {
        //             const users = [...value.get('users').values()];
        //             socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
        //         }
        //     });
        // });
        // ---------------------------------------------------


        socket.on("disconnect", () => {
            console.log("a user disconnect")
        })
    })
    return io;
};

// const server = require('http').createServer(app);
// const io = require ('socket.io')(server);

// io.on("connection", (socket) => {
//   console.log("a user connected")
//   socket.on('add user', (username) => {
//     console.log(username)
//     socket.broadcast.emit("user joined", {name:username})
//   })
//   socket.on("disconnect", () => {
//     console.log("a user disconnect")
//   })
// })