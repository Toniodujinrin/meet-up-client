import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Contact from './contacts';
import SearchBar from '../conversations/overview/searchBar';

const PendingContactsReceived = () => {
    const {pendingReceived} = useContext(UserContext)
    const [value,setValue] = useState("")
    return ( 
      
            <div>
            <SearchBar value={value} setValue={setValue} placeholder={"search for a contact"}/>
            <div className='w-full h-full lg:grid grid-cols-3 flex flex-col items-center'>
            {
                pendingReceived.map(user => 
                    <Contact username={user.username} _id={user._id}/>
                )
            }
            </div>
            </div>
      
     );
}
 
export default PendingContactsReceived;