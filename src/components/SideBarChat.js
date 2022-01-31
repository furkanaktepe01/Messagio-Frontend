import React from 'react'
import "./SideBarChat.css";
import { Avatar } from "@material-ui/core";

function SideBarChat({name, channel_id, setCurrentChat, setChatName}) {

    return (
        <div className="sidebarChat" onClick={() => {setCurrentChat(channel_id); setChatName(name);}}>
            <Avatar />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
            </div>
        </div>
    )
}

export default SideBarChat
