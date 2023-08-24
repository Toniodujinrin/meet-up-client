import React from 'react';
import Contact from '../../contacts/contacts';
 

const Details = ({conversationDetails, setCurrentDisplay}) => {
    
    return ( 
        <div className='flex flex-col items-center p-4 w-full'>
            <img onClick={()=>setCurrentDisplay("chat")} className='flex cursor-pointer self-start w-[30px] h-[30px] rotate-180' src="../chevron.svg" alt="" />
            <img className='w-[200px] aspect-square rounded-full border-4  border-midGray ' src={conversationDetails.conversationPic && conversationDetails.conversationPic.url ?conversationDetails.conversationPic.url: conversationDetails.type == "single"?"../userIcon.svg":"../groupIcon.svg"} alt="" />
            <h2 className='text-white text-[24px]'>{conversationDetails.name}</h2>
            
            <div className='flex flex-row gap-6 mt-4 '>
                <div className='flex flex-col items-center'>
                <img  className={'w-[30px] cursor-pointer'} src="../phoneIcon.svg" alt="" />
                <p className='text-mainGray text-[18px]'>Audio</p>
                </div>
                <div className='flex flex-col items-center'>
                <img className={'w-[30px] cursor-pointer'} src="../videoIcon.svg" alt="" />
                <p className='text-mainGray text-[18px]'>Video</p>
                </div>
            </div>

            <div className='w-full mt-4'>
                <div className='flex flex-row justify-between items-center'>
                <h1 className='text-white text-[21px]'>Members</h1>
                {
                    conversationDetails.type == "group" &&
                    <button   className='py-2 w-[100px] bg-tekhelet rounded-lg text-white'>Add</button>
                }
                
                </div>
                <div className='flex flex-col gap-4 mt-4 lg:grid gird-cols-3'>
                    {
                        conversationDetails.users.map(user => (
                            <Contact 
                            key={user._id} 
                            username={user.username}
                            image={user.profilePic? user.profilePic.url:""} _id={user._id}
                            />
                        ))
                    }
                </div>
            </div>

        </div>
     );
}
 
export default Details;