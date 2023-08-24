import React, { useEffect, useState } from 'react';
import ProfilePic from '../../profilePic';
import { useNavigate, useLocation, useSearchParams} from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../../../contexts/socketContext';

const Conversation = ({name, image,_id,lastMessage}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const {notifications} = useContext(SocketContext)
    const [amount,setAmount] = useState(0)
    
    

    useEffect(()=>{
        const notification = notifications.find(notification => notification.conversationId == _id)
        if(notification) setAmount(notification.amount)
        else setAmount(0)
    },[notifications])
    
    return ( 
        <div onClick={()=>{ location.pathname != `/conversation/${_id}` && navigate(`/conversation/${_id}`,{replace:true})}} className='w-full border-b  border-midGray gap-4 flex flex-row  items-center justify-between h-[100px]'>
        <div className='flex items-center gap-4'>
        <ProfilePic image={image}/>
        <div>
            <h2 className='text-white'>{name}</h2>
            <small className='text-mainGray'>{`Last message by ${lastMessage.senderId}`}</small>
        </div>
        </div>

        {
        amount > 0 &&
        <div className='w-[26px] h-[21px] bg-tekhelet rounded-[20px] flex items-center justify-center text-white'>
          {amount}
        </div>
        }
        
       </div>
     );
}
 
export default Conversation;