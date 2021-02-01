import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import classes from "./PlayroomsPage.module.css";
import MainChat from "../components/chat/MainChat";

export const Game21 = () => {
    const {loading, request} = useHttp()
    const [playrooms, setPlayrooms] = useState([])
    const {token, name} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request(
                '/api/game21/',
                'POST',
                {name:name},
                {Authorization: `Bearer ${token}`}
                )
            setPlayrooms(fetched)
        } catch (e) {
        }
    }, [token, request, name])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])
    console.log(playrooms)
    if (loading) {
        return <Loader/>
    }
    return(
        <div>Hello world
            <div className={classes.chat}>
                {!loading && <MainChat  playrooms={playrooms} name={name}/>}
            </div>
        </div>

    )
}