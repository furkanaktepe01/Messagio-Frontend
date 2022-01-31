import React, { useState } from 'react';
import "./Chat.css";
import { doTranslation, convertToLanguageCode } from "../Translate";
import { Avatar } from "@material-ui/core";
import { AttachFile, GTranslate, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from "../axios";

function Chat({ iconButtonWrapper, messages, channelId, chatName, senderName, setChatName }) {

    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("");

    const sendMessage = async (e, channelId) => {
        e.preventDefault();  
        
        let translation;
        if(language) translation = await doTranslation(input, language);
        
        await axios.post("/messages/new", {
            name: senderName,
            message: `${language==="" ? input : translation}`,
            timestamp: new Date().toUTCString(),
            channelId: channelId
        });
        setInput("");
    }

    return (
        <div className="chat" id="chat">
        
            <div className="chat__header">
                <Avatar />
                
                <div className="chat__headerInfo">
                    <h3>{chatName}</h3>
                </div>
                
                <div className="chat__headerRight">
                    {iconButtonWrapper([
                        <SearchOutlined />,
                        <AttachFile />,
                        <GTranslate onClick={() => setLanguage(convertToLanguageCode(prompt("Choose a language to translate typed messages: ")))}/>
                    ])}
                </div>
            </div>

            <div className="chat__body">
                
                {
                    messages.map( message => {

                        return (
                            <p key={message.timestamp} className={`chat__message ${ message.name===senderName ? "chat__sender" : "" }`} >
                                <span className="chat__name"> { message.name } </span>
                                { message.message }
                                <span className="chat__timestamp">
                                    { message.timestamp } 
                                </span>
                            </p>
                        );
                    })
                }

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                        placeholder="Type a message"
                        value={input}
                        onChange={e => setInput(e.target.value)} 
                        type="text"
                    />
                    <button 
                        type="submit"
                        onClick={e => {sendMessage(e, channelId)}}
                    >
                        Send message
                    </button>
                </form>
            </div>

        </div>
    )

}

export default Chat
