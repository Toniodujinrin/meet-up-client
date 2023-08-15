import React, { useState } from 'react';
import ProfilePic from '../../profilePic';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const ProfileHeader = () => {
    const {user, logout} = useContext(UserContext)
    const navigate = useNavigate()
    const [dropDownShowing, setDrowpDownShowing] = useState(false)
    return ( 
        <div className='flex flex-row p-4 border-b z-20 w-full justify-between h-[100px] border-midGray items-center'>
            <div className=' flex flex-row  gap-4'>
            <ProfilePic/>

            <div>
                <p className='text-white'>{user.username}</p>
                <small className='text-mainGray'>My Account</small>
            </div>
            </div>
            
            <div className='flex flex-col' >
            
        
            
            <img onClick={()=>setDrowpDownShowing(!dropDownShowing)} src="../menuIcon.svg" className='w-[30px] z-20 relative aspect-square cursor-pointer' alt="" />
            <ul className={` ${!dropDownShowing && `hidden` } bg-midGray w-[200px] rounded-lg border-mainGray  border   text-white absolute z-10 top-[70px]`}>
                <li className=' border-b cursor-pointer flex flex-row items-center justify-between border-mainGray p-2'><p>Settings</p><img className='w-[20px] h-[20px]' src="../settingsIcon.svg" alt="" /></li>
                <li onClick={()=>navigate("/contacts")} className='border-b border-mainGray flex flex-row items-center justify-between cursor-pointer p-2' ><p>Contacts</p><img className='w-[20px] h-[20px]' src="../groupIconWhite.svg" alt="" /></li>
                <li onClick={logout} className='flex flex-row items-center justify-between text-red-600 cursor-pointer p-2'><p>Log out</p><img className='w-[20px] h-[20px]' src="../logoutIcon.svg" alt="" /></li>
            </ul>
           
            </div>
            
        </div>
     );
}
 
export default ProfileHeader;