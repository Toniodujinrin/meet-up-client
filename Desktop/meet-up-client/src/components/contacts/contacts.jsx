import React, { useState } from 'react';
import ProfilePic from '../profilePic';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';


const Contact = ({username, image, _id}) => {
    const user = JSON.parse(window.localStorage.getItem("user"))
    const {pendingReceived, userContacts, pendingSent, sendRequest , acceptRequest} = useContext(UserContext)
    const contacts = userContacts.map(contact => {return contact._id})
    const received = pendingReceived.map(contact => {return contact._id})
    const sent = pendingSent.map(contact => {return contact._id})
    return ( 
        <div className='bg-midGray cursor-pointer rounded-md lg:w-[300px] w-full gap-3 p-3 h-[70px] items-center flex flex-row'>
           
            <ProfilePic image={image}/>
            <div>
            <p className='text-white'>{username}</p>
            <small className='text-mainGray'>{_id}</small>
            </div>

            {
                !contacts.includes(_id) && !received.includes(_id) && !sent.includes(_id)&& user._id !== _id&&
                <img onClick={()=>sendRequest(_id)} className='w-[30px] h-[30px]' src="../addIcon.svg" alt="" />
            }

            {
                received.includes(_id)&&
                <img onClick={()=>acceptRequest(_id)} src="../accept.svg" alt="" className='w-[30px] h-[30px]' />
            }
        </div>
     );
}
 
export default Contact;