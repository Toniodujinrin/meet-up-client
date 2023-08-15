import React from 'react';
import ProfilePic from '../../profilePic';
import { useNavigate, useLocation } from 'react-router-dom';


const Conversation = ({name, image,_id,}) => {
    const navigate = useNavigate()
    const location = useLocation()
  
    return ( 
        <div onClick={()=>{ location.pathname != `/conversation/${_id}` && navigate(`/conversation/${_id}`)}} className='w-full border-b  border-midGray gap-4 flex flex-row  items-center  h-[100px]'>
        <ProfilePic image={image}/>
        <div>
            <h2 className='text-white'>{name}</h2>
            <small className='text-mainGray'>text</small>
        </div>
       </div>
     );
}
 
export default Conversation;