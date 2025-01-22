import useGetConversations from "../../hooks/useGetConversations"
import { getRandomEmoji } from "../../utils/emojis"
import Conversation from "./Conversation"
// This is where each Conversation Component is contained
const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* Overflow auto makes it automatic to scroll down if there are a lot of conversations */}
      
      {conversations.map((conversation, idx) => (
            <Conversation 
            key = {conversation._id}
            conversation = {conversation}
            emoji = {getRandomEmoji()}
            lastIdx = {idx === conversations.length - 1}
            />

            // The last index = if index is length - 1 (ourselves excluded), then that's the last index
            // The last index won't show the divider
            // The last 3 are used for props for the conversation
      ))}
      
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}

    </div>
  )
}

export default Conversations

//STARTER CODE
// import Conversation from "./Conversation"
// // This is where each Conversation Component is contained
// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       {/* Overflow auto makes it automatic to scroll down if there are a lot of conversations */}
//       <Conversation/>
//       <Conversation/>
//       <Conversation/>
//       <Conversation/>

//     </div>
//   )
// }

// export default Conversations