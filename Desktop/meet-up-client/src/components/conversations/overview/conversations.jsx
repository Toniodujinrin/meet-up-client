import React from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useContext } from 'react';
import Conversation from './conversation';
import { useNavigate } from 'react-router-dom';
const Conversations = () => {
    const navigate = useNavigate()
    const {userConversations}= useContext(UserContext)

    
    return ( 
        <div className='bg-darkGray h-full w-full p-4'>
            <div className='w-full flex flex-row justify-between items-center'>
            <h1 className='text-[21px] text-white'>Conversations</h1>
            <button  onClick={()=>navigate("/create")} className='py-2 w-[100px] bg-tekhelet rounded-lg text-white'>New</button>
            </div>
            {
                userConversations.map(conversation =>
                    <Conversation key={conversation._id} name={conversation.name} image={conversation.image} type={conversation.type} _id={conversation._id}/>
                )
            }

        </div>
     );
}
 
export default Conversations;