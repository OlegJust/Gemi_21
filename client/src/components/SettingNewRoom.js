import React, {useContext, useEffect, useState} from 'react'
import classes from "./SettingNewRoom.module.css"
import {useHttp} from "../hooks/http.hook";
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import socket from "../core/socket";

export const SettingNewRoom = ({vkl}) => {
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        acePoints: '1/11', playerBalance: 100
    })
    useEffect(() => {
        console.log(error)
        clearError()
    }, [error, clearError])

    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name + String(+new Date()))
    const roomСreation = async () => {
        setName(auth.name + String(+new Date()))
        socket.emit('add playroom', {nameRoom: name,name: auth.name} )
    }

    if  (vkl === "off") {
        return (
            <div/>
        )
    }


    return (
        <div className={classes.setting}>
            <div className={classes.setting_block}>
                <div className={classes.points}>
                    Player Баланс:
                    <input
                        id="PlayerBalans"
                        name="playerBalance"
                        type="number"
                        value={form.playerBalance}
                        onChange={(event) => {setForm({ ...form, [event.target.name]: event.target.value })}}/>
                </div>
                <div className={classes.ace}>
                    <p>
                        <input
                            id="r3"
                            type="radio"
                            name="acePoints"
                            value="lager"
                            onChange={(event) => {setForm({ ...form, [event.target.name]: "11" })}}
                        />Туз равен = 11
                    </p>
                    <p>
                        <input
                            id="r2"
                            type="radio"
                            name="acePoints"
                            value="darge"
                            onChange={(event) => {setForm({ ...form, [event.target.name]: "1" })}}
                        />Туз равен = 1
                    </p>
                    <p>
                        <input
                            id="r1"
                            defaultChecked={true}
                            type="radio"
                            name="acePoints"
                            value="darge"
                            onChange={(event) => {setForm({ ...form, [event.target.name]: "1/11" })}}
                        />Туз равен = 1 / 11
                    </p>
                </div>
                <div className={classes.settingBu}>
                    <li><NavLink to="/game21" disabled={loading} onClick={roomСreation} >создать</NavLink></li>
                </div>
            </div>
        </div>
    )
}