import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import Contact from '../../create/contact';
import { ConversationContext } from '../../../../contexts/conversationContext';


const Add = ({setCurrentDisplay}) => {
    const [selected,setSelected] = useState(["a","b"])
    const {userContacts} = useContext(UserContext)
    const {conversationDetails} = useContext(ConversationContext)
    

    const users = conversationDetails.users.map(user => {return user._id})
    const listOfContacts = userContacts.filter(contact => !users.includes(contact._id))
    
    
    const select = (_id)=>{
       
        if(selected.includes(_id)){
         const _selected = selected.filter(item => item !== _id)
         setSelected(_selected)
       }
       else setSelected([_id,...selected])
       console.log(selected)
    }

    const handleAdd = ()=>{
        console.log(selected)
    }

    return (  
        <div className='w-full h-full bg-black p-4'>
            <div className='flex flex-row justify-between mb-4'>
            <div className='flex gap-3 items-center'>
            <img onClick={()=>setCurrentDisplay("info")} src="../chevron.svg" className='w-[30px] h-[30px] cursor-pointer rotate-180 ' alt="" />
            <h1 className='text-white font-semibold text-[32px]'>Add</h1>
            </div>
            <button onClick={handleAdd} disabled={selected.length == 0}  className='py-2 w-[100px] bg-tekhelet rounded-lg text-white'>Add</button>
            </div>
       
            <div className='w-full lg:grid grid-cols-3 flex flex-col  mt-4 gap-4'>
            {
                listOfContacts.map(contact => 
                    <Contact key={contact._id} image={contact.profilePic? contact.profilePic.url:""} username={contact.username} _id = {contact._id} selected={selected} select={select}/>
                )
            }
            </div>
        </div>
    );
}
 
export default Add;