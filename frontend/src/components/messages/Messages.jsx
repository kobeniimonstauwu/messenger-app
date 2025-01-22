import useGetMessages from '../../hooks/useGetMessages'
import Message from './Message'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useEffect, useRef } from 'react'
import useListenMessages from '../../hooks/useListenMessages'
const Messages = () => {
  
  const {messages, loading} = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
    // This useEffect will work whenever there are messages given the right condition 
   
  }, [messages])
  console.log("messages: ", messages)
  return (
    <div className="px-4 flex-1 overflow-auto">
     
    {!loading && messages.length > 0 && messages.map((message) =>(
      <div 
      key = {message._id}
      ref = {lastMessageRef}> 
      {/* This div has both the key and the ref, so each message  */}
      <Message  message = {message} />
      {/* // "message" will be used as a prop in Message.jsx in order to identify who the sender and receiver is
      // This will also count the messages if there are any at first */}
      </div>
    ))}
 {/* Message Skeleton is rendered 3 times here, 3 times in the array in a for loop */}
    {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key = {idx} />)}

    {!loading  && messages.length === 0 && (
      <p className="text-center"> Send a message to start the conversation! </p>
    )}
    </div>

  )
}

export default Messages

//STARTER CODE
// import Message from './Message'
// const Messages = () => {
//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//     </div>
//   )
// }

// export default Messages