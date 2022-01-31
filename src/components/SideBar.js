import React, { useState, useEffect } from "react";
import "./SideBar.css";
import SideBarChat from "./SideBarChat";
import { Avatar } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVerification from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons"
import axios from "../axios";


const SideBar = ({ iconButtonWrapper, createNewChannel, setCurrentChat, setChatName, user}) => {

    const [sidebarChats, setSidebarChats] = useState([]);

    useEffect(() => {
        const fetchChannels = async (email) => {
            
            const res = await axios.get(`/channels/initial_fetch/${email}`); 

            const SideBarChatList = res.data.map(channel => { 

                const name = user.name===channel.user_0.name ? channel.user_1.name : channel.user_0.name;

                return <SideBarChat name={name} channel_id={channel._id} setCurrentChat={setCurrentChat} setChatName={setChatName} key={channel._id}/>
            })

            setSidebarChats(SideBarChatList)

        }

        user && fetchChannels(user.email);

    }, [user])

    const avatarSrc = "https://images.pexels.com/photos/220453/"+
        "pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

    const createNewChannelReq = async () => {
        const user_1_email = prompt("Type the email of person you want to chat: ");
        const res = await createNewChannel(user_1_email); 
        if(!res) { return; }
        const channel = res.data; 
        setChatName(channel.user_1.name);
        if(res) {
            setSidebarChats([...sidebarChats, <SideBarChat name={channel.user_1.name} channel_id={channel._id} setCurrentChat={setCurrentChat} setChatName={setChatName}/>]);
        } 
    }
    
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={avatarSrc}/>
                <div className="sidebar__headerRight">
                    { iconButtonWrapper([
                        <DonutLargeIcon/>,
                        <ChatIcon/>,
                        <MoreVerification/>    
                    ]) }
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input 
                        type="text" 
                        placeholder="Search or start a chat"    
                    />
                </div>
            </div>
            
            <div className="sidebar__chats">
            <Box textAlign='center' marginTop={"8px"}>
                <Button color="primary" variant="contained" onClick={createNewChannelReq} >
                    New Chat
                </Button>
            </Box>
            <hr/>
            {sidebarChats}
            </div>
        </div>
    )

}

export default SideBar;
