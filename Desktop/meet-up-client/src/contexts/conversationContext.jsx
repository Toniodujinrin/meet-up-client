import { createContext, useContext, useState } from "react";
import { post } from "../api/config";
import { toast } from "react-hot-toast";
import { TokenContext } from "./TokenContext";
import { useNavigate } from "react-router-dom";
import { get } from "../api/config";
import { useQueryClient } from "react-query";

export const ConversationContext = createContext()

const ConversationContextProvider  = ({children})=>{
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [conversationDetails, setconversationDetails] = useState(null)
    const {checkForToken} = useContext(TokenContext)

    const getConversation = async(id)=>{
        if(!checkForToken()) return navigate("/login",{replace:true})
        try{
            const {data} = await get(`conversations/${id}`)
            if(data) setconversationDetails(data)
            else setconversationDetails(null)
        }
        catch(error){
            if(error.response && error.response.data) return toast.error(error.response.data)
           
            toast.error("could not get conversation details")
        }
     
    }

    const createConversation = async (payload)=>{
        if(!checkForToken()) return navigate("/login",{replace:true})
        try {
            const {data} = await post("conversations",payload)
            if (data && data.status == "success" ) queryClient.invalidateQueries({queryKey:["conversations"]})
            navigate("/main")
        } catch (error) {
            if(error.response && error.response.data) return toast.error(error.response.data)
            
            toast.error("could not create conversation")
        }

    }
    return(<ConversationContext.Provider value={{createConversation, getConversation, conversationDetails}}>{children}</ConversationContext.Provider>)
}

export default ConversationContextProvider