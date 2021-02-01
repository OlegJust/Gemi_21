import React, {useEffect, useCallback, useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {Navbar} from "../components/Navbar";
import {AuthContext} from "../context/AuthContext";
import classes from "./PlayroomsPage.module.css"
import MainChat from "../components/chat/MainChat";
import socket from "../core/socket"


export const PlayroomsPage = () => {
    const [playrooms, setPlayrooms] = useState([])
    const [userPlayroom, setUserPlayroom] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/playrooms', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPlayrooms(fetched)
        } catch (e) {
        }
    }, [token, request])
    useEffect(() => {
        socket.on('get playroom', (data) => {
            setPlayrooms(data)
            console.log()
        })

        socket.on('get userPlayroom', (data) => {
            setUserPlayroom(data)
        })
    }, [])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={classes.flex}>
            <div className={classes.content}>
                {!loading && <Navbar playrooms={playrooms} userPlayroom={userPlayroom} />}
            </div>
        </div>
    )
}
