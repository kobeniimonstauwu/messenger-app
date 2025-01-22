import { useEffect ,useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const {messages, setMessages, selectedConversation} = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try{  
        const res = await fetch(`/api/messages/${selectedConversation._id}`)
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        setMessages(data)
      }
      catch(error){
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
    }

    if(selectedConversation?._id) getMessages()
  },[selectedConversation?._id, setMessages] )
  // The useEffect is used not only for cleanup, but 
  // also for data that updates regularly (persistent data)
  // It will run when the data changes in this array

  return {messages, loading}
}

export default useGetMessages