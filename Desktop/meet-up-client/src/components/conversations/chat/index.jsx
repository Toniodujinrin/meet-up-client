import React, { useEffect, useState } from 'react';
import InputBox from './inputBox';
import Header from './header';
import { useContext } from 'react';
import { SocketContext } from '../../../contexts/socketContext';
import { useParams } from 'react-router-dom';
import Message from './message';
const Chat = () => {
    const {messages, onlineGroupUsers, groupKey, sendMessage} = useContext(SocketContext)
    const [value,setValue] = useState("")
    const {id} = useParams()
    const handleSendMessage = ()=>{
        const paylaod = {
            body:value,
            conversationId:id
        }
        sendMessage(paylaod)
        setValue("")
    }

   
    
    return ( 
    <div className='h-screen w-full flex flex-col'>
    <Header/>
    <div className='bg-black w-full h-[calc(100vh-200px)]'>
        <div className='mx-auto w-fit p-2 mt-3 items-center flex flex-row gap-3 rounded-md bg-midGray'>
            <img src="../lockIcon.svg" className='w-[20px] h-[20px]' alt="" />
            <p className='text-mainGray'>End to End Encrypted</p>
        </div>
        <div className=' flex overflow-scroll overflow-x-hidden h-[calc(100%-50px)] flex-col gap-4 w-full p-3 '>
            {
                messages.map((message,index) =>
                    <Message key={index} body={message.body} senderId={message.senderId} timeStamp={message.timeStamp} status={message.status}/>
                )
                    
            }
        </div>
    </div>
    <InputBox value={value} setValue={setValue} handleSendMessage={handleSendMessage}/>
    </div> 
    );
}
 
export default Chat;