import { useEffect, useState } from "react";
import './App.css';
import Chat from './components/Chat';
import SideBar from './components/SideBar';
import { IconButton } from "@material-ui/core";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Login";


function App({user, setUser}) {

  const [messages, setMessages] = useState([]); console.log(messages);
  const [currentChat, setCurrentChat] = useState("");
  const [chatName, setChatName] = useState("Welcome");
  
  const createNewChannel = async (user_1_email) => {
   
    const other_user = await axios.get(`/email-to-user/${user_1_email}`);

    if(other_user.data===0) { 
      alert("No user found.");
      return null; 
    } else {
      
      const newChannel = {
        user_0: user,
        user_1: other_user.data
      }
      
      const res = await axios.post("/channels/new", newChannel); 

      return res;
    }

  }

  const fetchChannel = async (id) => { 
    const res = await axios.get(`/channels/${id}`);
    setMessages(res.data);
    setCurrentChat(id); 
  }
   
  useEffect(() => {
    if(!user) return;
    fetchChannel(currentChat); 
  }, [currentChat, user])

  // Pusher
  useEffect(() => {
    const pusher = new Pusher('3e88269f715be8f452f3', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
    
  }, [messages]);

  const iconButtonWrapper = (iconTags) => {
    return iconTags.map( iconTag => { 
      return (
        <IconButton>
          {iconTag}
        </IconButton>
      );
    });
  }

  if (!user) {
    return (
        <div>
          <h1>Sign In to start chatting...</h1>
        </div>
    );
  }

  return (
    <div style={{backgroundColor:"#dadbd3"}}>
      <Login user={user} setUser={setUser} />
      <div className="app"> 
        <div className="app__body" id="app__body">
          <SideBar 
            iconButtonWrapper={iconButtonWrapper} 
            createNewChannel={createNewChannel}
            setCurrentChat={setCurrentChat}
            setChatName={setChatName}
            user={user && user}
          />
          <Chat 
            iconButtonWrapper={iconButtonWrapper} 
            messages={messages}
            channelId={currentChat}
            chatName={chatName}
            setChatName={setChatName}
            senderName={user && user.givenName}
          />
        </div>
      </div>
    </div>
    
  );

}

export default App;
