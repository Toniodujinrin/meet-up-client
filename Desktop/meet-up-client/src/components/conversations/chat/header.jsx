import React from 'react';
import ProfilePic from '../../profilePic';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import { useContext } from 'react';
import { ConversationContext } from '../../../contexts/conversationContext';
import { SocketContext } from '../../../contexts/socketContext';
import { useParams } from 'react-router-dom';
const Header = () => {
    dayjs.extend(relativeTime)
    const {conversationDetails} = useContext(ConversationContext)
    const {onlineGroupUsers, leaveConversation} = useContext(SocketContext)
    const {id} = useParams()
    const navigate = useNavigate()
    return (  
        <div className='bg-darkGray w-full h-[100px] flex border-b border-midGray flex-row items-center justify-between p-4 '>
            <div className='flex flex-row gap-3 items-center'>
                <img onClick={()=>{navigate(-1); leaveConversation(id) }} className=' rotate-180 w-[30px] h-[30px]' src="../chevron.svg" alt="" />
                <ProfilePic/>
                <div>
                    <p className='text-white font-semibold'>{conversationDetails.name}</p>
                    {
                        conversationDetails.type =="single"?
                            <small className={`${onlineGroupUsers.length <= 1? `text-mainGray`:`text-tekhelet`}`}>{`${onlineGroupUsers.length <= 1? `Last seen : ${dayjs(conversationDetails.lastSeen).fromNow()}` : "online"}`}</small>
                            :
                            <div>
                                {}
                            </div>
                    }
                    
                </div>
            </div>

            <div className='flex flex-row gap-4 '>
                <img  className={'w-[25px] cursor-pointer'} src="../phoneIcon.svg" alt="" />
                <img className={'w-[25px] cursor-pointer'} src="../videoIcon.svg" alt="" />
                <img className={'w-[25px] cursor-pointer'} src="../menuIcon.svg" alt="" />
            </div>
        </div>
    );
}
 
export default Header;