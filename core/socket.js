const socket = require('socket.io');

let {playrooms} = require("../temporaryDatabase/temporaryDatabase")
let {message} = require("../temporaryDatabase/temporaryDatabase")

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
                    playrooms[ass].participants.push(data.name)
                    // ----- если ктото присоединиться к комноте то показываем пользователю который ище не вашол
                    socket.broadcast.emit("get userPlayroom", data = playrooms[ass].participants)

                }
                ass += 1
            }

        })

        // ------------------ сработа в отдельной комнате
        socket.on("NEW_CHAT_MESSAGE_EVENT", (data) => {
            let nameRoom = data.roomId;
            if (data.roomId !== null) {
                // let ass = 0
                // for (const person of playrooms) {
                //     if (person.nameRoom === nameRoom && data.body !== "") {
                //         playrooms[ass].chat.push(data)
                //         console.log(playrooms[ass].chat)
                //     }
                //     ass += 1
                // }
                console.log(socket.handshake.query)
                socket.join(nameRoom)

                // ------------------ отправка сообщение
                io.in(nameRoom).emit("NEW_CHAT_MESSAGE_EVENT", data);
            }
        })


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