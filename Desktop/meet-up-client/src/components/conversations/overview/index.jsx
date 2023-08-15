import React, { useState } from 'react';
import SearchBar from './searchBar';
import ProfileHeader from './profileHeader';
import OnlineUsers from './onlineUsers';
import Conversations from './conversations';


const Overview = () => {
    const[search, setSeach] = useState("")
    return ( 
        <div className='bg-darkGray h-screen flex w-full  items-center flex-col'>
            <ProfileHeader/>
            <div className='w-[90%]'>
            <SearchBar placeholder={'Search for users or converations'} value={search} setValue={setSeach}/>
            </div>
            <OnlineUsers/>
           <Conversations/>

        </div>
     );
}
 
export default Overview;