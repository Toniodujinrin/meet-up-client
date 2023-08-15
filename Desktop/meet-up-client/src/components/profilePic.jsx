import React from 'react';

const ProfilePic = ({image}) => {
    return ( 
            <div className={`w-[50px] ${!image && `p-2`} bg-black aspect-square rounded-full`}>
            <img className='w-full h-full' src={image?image:"../userIcon.svg"} alt="" />
            </div>
        
     );
}
 
export default ProfilePic;