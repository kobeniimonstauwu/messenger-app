import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime"
import useConversation from "../../zustand/useConversation"

// Uses Chat Bubble Component in DaisyUI
const Message = ({message}) => {

  const {authUser} = useAuthContext() // This contains the user information (your own info)
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId == authUser._id
  // This will identify the sender which is the same as the authenticated user (you), through a variable
  const formattedTime = extractTime(message.createdAt)
  // These will be applied for the respective class names or elements
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic
  const bubbleBgColor  = fromMe ? 'bg-blue-500' : ""
  const shakeClass = message.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img 
          src= {profilePic} 
          alt="Tailwind CSS Chat Bubble Component (Daisy UI)" />
        </div>
      </div>

      <div className= {`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}> {message.message} </div>  
      <div className= 'chat-footer opacity-50 text-xs flex gap-1 items-center '> {formattedTime} </div>  
    </div>
  )
}

export default Message