//Listening Messages for the receiver

import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"
import { useEffect } from "react"
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
  const {socket} = useSocketContext()
  const {messages, setMessages} = useConversation()

  //persistently listens for an event
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true 
      const sound = new Audio(notificationSound)
      sound.play()
      // It shakes everytime a new message is sent or everytime it updates
      setMessages([...messages, newMessage])
    })
    return () => socket?.off("newMessage")
    // When messages are unmounted like logging off or quitting suddenly, it turns off the socket
    // It also avoids bugs like multiple sounds because of multiple newMessages that it can read, just like how a user connects and disconnects
    // It makes sense since it's in useEffect
  }, [socket, setMessages, messages])
  // Socket is just for updating the receiver and the sender based on their id with the messages
}

export default useListenMessages