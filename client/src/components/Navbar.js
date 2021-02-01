import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import classes from "./Navbar.module.css"
import socket from "../core/socket"

export const Navbar = ({playrooms,userPlayroom}) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const userRoom = (number) => {
        if (userPlayroom.length === 0 ) {
            return number
        } else if (userPlayroom.length !== 0) {
            return userPlayroom.length
        } else {
            return "Error"
        }
    }

    const logoutHandler = () => {
        auth.logout()
        history.push('/')
    }
    const joinUser = (nameRoom) => {
        socket.emit('join user', {nameRoom: nameRoom, name:auth.name})
    }

    if (!playrooms.length) {
        return <p className="center">Комнат нету</p>
    }
    return (
        <nav>
            <div style={{padding: '0 2rem'}}>
                <span>Комнаты в онлайне:</span>
                <div className={classes.grid}>
                    {playrooms.map((room) => {
                        // key={link._id} устраняет ошибкуреакта
                        return (
                            <div className={classes.room} key={room.nameRoom}><NavLink
                                    className={classes.navLink}
                                    to="/game21"
                                    disabled={auth.loading}
                                    onClick={() => {joinUser(room.nameRoom)}}
                                >{"комната " + room.nameRoom}{ "Игроков" + userRoom(room.participants.length)}</NavLink>
                            </div>
                        )
                    })}
                </div>
              <a href="/" onClick={logoutHandler}>Выйти</a>
            </div>
        </nav>
    )
}
