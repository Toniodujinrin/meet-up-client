import { useContext, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Encryption from "../encryption";
import { TokenContext } from "./TokenContext";
import { toast } from "react-hot-toast";


const URL = `https://meetup-rosy.vercel.app/`


export const SocketContext = createContext()
const sock = io(URL,{autoConnect:false})

const SocketContextProvider = ({children})=>{
    const encryption = new Encryption()
    const [socket,setSocket] = useState()
    const navigate = useNavigate()
    const {checkForToken} = useContext(TokenContext)
    const [onlineContacts,setOnlineContacts] = useState([])
    const [messages,setMessages] = useState([])
    const [onlineGroupUsers,setOnlineGroupUsers] = useState([])
    const [groupKey, setGroupKey] = useState("")
    const [previousMessages, setPreviousMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const [encryptedGroupKey,setEncryptedGroupKey] = useState()
    const [currentConversation,setCurrentConversation] = useState('')
   
    useEffect(()=>{
        //perform connection again when the page is loaded redirect user to main page
        if(!checkForToken()) return navigate("/login")
        const token = window.localStorage.getItem("token")
        sock.auth = {token}
        sock.connect()
        sock.on("onlineContacts", args => setOnlineContacts(args) )
        sock.on("conn_error",()=>{toast.error("connection error")})
        navigate("/main",{replace:true})
        setSocket(sock)

        return ()=>{
            sock.disconnect()
        }
    },[])

    const connect = ()=>{
        if(!checkForToken()) return navigate("/login")
        const token = window.localStorage.getItem("token")
        sock.auth = {token}
        sock.connect()
        sock.on("onlineContacts", args => setOnlineContacts(args) )
        setSocket(sock)
    }

    useEffect(()=>{
        if(newMessage && groupKey){
            const _newMessage = newMessage
            _newMessage.body = JSON.parse(encryption.decryptMessage(_newMessage.body, groupKey))
            setMessages([...messages,_newMessage])
    }
    },[newMessage])

    useEffect(()=>{
        const user = JSON.parse(window.localStorage.getItem("user"))
        if(encryptedGroupKey && user){
            console.log(encryptedGroupKey)
            setGroupKey(encryption.decryptGroupKey(user.keyPair.privateKey,encryptedGroupKey))
        }
    },[encryptedGroupKey])

    useEffect(()=>{
        try{
        if(groupKey){
            const _previousMessages = [...previousMessages]
            _previousMessages.map(message => {
                if(typeof message.body == "string") message.body = JSON.parse(encryption.decryptMessage(message.body,groupKey))
            })
            setMessages(_previousMessages)
           
        }
       }
       catch(error){
        console.log(error)
       }
    },[groupKey,previousMessages])

    const disconnect = ()=>{
        if(socket){
            socket.disconnect()
        }
        
    }

    const joinConversation = (conversationId)=>{
        if(socket){
            if(currentConversation){
                leaveConversation(currentConversation)
            }
            setCurrentConversation(conversationId)
            socket.emit("join",{conversationId})
            socket.on("previousMessages", args =>{setPreviousMessages(args)})
            socket.on("groupKey", args => {setEncryptedGroupKey(args)})
            socket.on("onlineUsers", args => {setOnlineGroupUsers(args)})
            socket.on("new_message", args => setNewMessage(args))
        }
    }

    const leaveConversation = (conversationId)=>{
        if(socket){
            socket.emit("leaveRoom",{conversationId})
        }
    }

    const sendMessage = (payload)=>{
        if(groupKey && socket){
        payload.body = encryption.encryptMessage(payload.body, groupKey)
        socket.emit("message",payload)
        }
        else toast.error("could not send message")
    }

    

    return(
        <SocketContext.Provider value={{joinConversation, connect, messages, onlineGroupUsers, sendMessage, onlineContacts, leaveConversation,disconnect}}>
            {children}
        </SocketContext.Provider>
    )

}

export default SocketContextProvider