import Messages from "./Messages"
import MessageInput from "./MessageInput"
import { PiChatsLight } from "react-icons/pi";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  // This is where the conversation data is fetched, hard coded data is found below (commented)
  // const noChatSelected = true

  const { selectedConversation, setSelectedConversation }= useConversation()

  // UNMOUNT STATE FOR RESETTING THE SELECTED CONVERSATION SO NO CONVERSATION WILL BE SELECTED WHEN YOU LOGOUT THEN LOGIN
  useEffect(() => {
    // Cleanup Function
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  // This will only work when the selected conversation is no longer in the view of the browser/page
  // When the setSelectedConversation is no longer in the page, it will set the value to null first
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ): (
        <>
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <span className="label-text"> To: </span> <span className="text-gray-900 font-bold"> {selectedConversation.fullName} </span>
        </div>
        <Messages />
        <MessageInput />
      </>
      )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  const {authUser} = useAuthContext()
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome, {authUser.fullName}! </p>
				<p>Select a chat to start messaging</p>
				<PiChatsLight className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

//STARTER CODE
// import Messages from "./Messages"

// const MessageContainer = () => {
//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//       <>
//         <div className="bg-slate-500 px-4 py-2 mb-2">
//           <span className="label-text"> To: </span> <span className="text-gray-900 font-bold"> John Doe </span>
//         </div>

//         <Messages />
//         {/* <MessageInput /> */}
//       </>
//     </div>
//   )
// }

// export default MessageContainer