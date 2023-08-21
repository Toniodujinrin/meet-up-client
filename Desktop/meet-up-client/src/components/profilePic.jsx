import React from 'react';

const ProfilePic = ({image, type}) => {
    
    return ( 
        <div>
                {
                    type == "online"&&
                    <div className='w-[10px] h-[10px] border border-darkGray rounded-full relative top-[15px] bg-tekhelet'></div>
                }
            
            <div className={`w-[50px] ${!image && `p-2`} bg-black border-2 border-midGray aspect-square rounded-full`}>
            
            <img className={` w-full h-full ${image && `rounded-full`}`} src={image?image:"../userIcon.svg"} alt="" />
            </div>
            </div>
        
     );
}
 
export default ProfilePic;