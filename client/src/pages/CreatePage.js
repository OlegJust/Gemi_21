import React, {useState} from 'react'
import classes from "./Create.module.css"
import {SettingNewRoom} from "../components/SettingNewRoom";


export const CreatePage = () => {
    let [vkl, setVkl] = useState("off")

    const pressHandler = async () => {
        if (vkl === "off"){
            setVkl("on")
        } else  {
            setVkl("off")
        }
    }

    return (
        <div>
            <button className={classes.but} onClick={pressHandler}>
                создать комнату
            </button>
            <SettingNewRoom vkl={vkl}/>
        </div>
    )
}
