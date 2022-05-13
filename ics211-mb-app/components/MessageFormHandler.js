import { useState, useRef } from 'react';
import NewMessageForm from './NewMessageForm.js';
import MessageTable from './MessageTable.js';
import axios from 'axios';
import LoginForm from './LoginForm.js';
import jwt_decode from 'jwt-decode';



const MessageFormHandler=({jsonData})=>{
    const usernameRef = useRef(null);
    const [messages, setMessages] = useState(jsonData);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const  addNewMessage = async(values) => { 
        //console.log(values); prints msgText and name
        //values.id = messages.length; 
        values.name = usernameRef.current;
        const axiosReqConfig = {
            url: `${process.env.NEXT_PUBLIC_HOST}/api/messages`,
            method: 'post',
            headers: { 
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: values
        }
        try{
            values.name = usernameRef.current;
            const { data } = await axios(axiosReqConfig);
            //const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/messages`,values);
            //console.log(data)
            setMessages( [data, ...messages] );
        }
        catch(exception){
            console.log("Exception: " + exception );
        }
    } 

    const logInUser = async(values) => {
        console.log(values);
        // TODO: change the state of the boolean state hook (call the set function)
        
        try{
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`,values);
            //console.log(data)
            setIsLoggedIn(true);
            sessionStorage.setItem('token',data.token);
            const decodedToken = jwt_decode(data.token);
            usernameRef.current  = decodedToken.username; 
        }
        catch(exception){
            console.log("Exception: " + exception );
        }
    }
    return(
        <>
        {isLoggedIn ?<NewMessageForm addNewMessage={addNewMessage}/> 
            :<LoginForm logInUser={logInUser}/>}
            <MessageTable messages = {messages}/>
        </>
    );

}


export default MessageFormHandler;