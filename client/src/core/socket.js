import io from "socket.io-client";

const socket = io();

export default socket;

// import io from 'socket.io-client'
// const socket = io()


// const changeHandler = (event) => { // отправить
//     setForm(event.target.value) // передаём даные из инпута
//     socket.emit('add user', event.target.value)
// }
//
// useEffect(() => { // получить
//     console.log('1')
//     socket.on('user joined', (data) => {
//         console.log(data)
//     })
// }, [])