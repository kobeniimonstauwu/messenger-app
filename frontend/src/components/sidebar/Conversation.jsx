import useConversation from '../../zustand/useConversation'
import { useSocketContext } from "../../context/SocketContext";
 
const Conversation = ({conversation, lastIdx, emoji}) => {
  // GLOBAL STATE WILL BE USED ONCE A SINGLE CONVERSATION IS CLICKED, CHANGING THE BACKGROUND OF THE CONVERSATION IN THE SIDEBAR

  const {selectedConversation, setSelectedConversation} = useConversation()
  
  const isSelected = selectedConversation?._id === conversation._id
  const { onlineUsers } = useSocketContext()
  const isOnline  = onlineUsers.includes(conversation._id)
  // This variable shows the matching online users returned from the socket to the user's ids listed here

  // Once it is selected, and matches the conversation id, then it will be used to change the background w/ messages
  return (<>
    
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-sky-500" : ""}`}
      onClick={() => setSelectedConversation(conversation)}
      // On click, it will set the conversation which will also set the isSelected, which will also set the background once you click it
      >
      {/* This is where the avatar and status are located */}
      <div className= {`avatar ${isOnline ? "online" : ""}`}>
        {/* Basically it only adds the online status to those who are online based on the socket values */}
        <div className="w-12 rounded-full">
          <img src= {conversation.profilePic} alt="User Avatar" />
        </div>
      </div>
      {/* Image and On/Off Status */}

      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200"> {conversation.fullName}</p>
          <span className="text-xl"> {emoji} </span>
        </div>
      </div>
    </div>
    {/* Name and Activity Status */}

    {!lastIdx && <div className="divider my-0 py-0 h-1" /> }
    {/* If not last index, it will show the divider div */}
    {/* Divider for each conversation */}
    </>


  )
}

export default Conversation

//STARTER CODE
// const Conversation = () => {
//   return (<>
    
//     <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
//       {/* This is where the avatar and status are located */}
//       <div className="avatar online">
//         <div className="w-12 rounded-full">
//           <img src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" alt="User Avatar" />
//         </div>
//       </div>
//       {/* Image and On/Off Status */}

//       <div className="flex flex-col flex-1">
//         <div className="flex gap-3 justify-between">
//           <p className="font-bold text-gray-200"> John Doe </p>
//           <span className="text-xl"> 👾 </span>
//         </div>
//       </div>
//     </div>
//     {/* Name and Activity Status */}

//     <div className="divider my-0 py-0 h-1" /> 
//     {/* Divider for each conversation */}
//     </>


//   )
// }

// export default Conversation