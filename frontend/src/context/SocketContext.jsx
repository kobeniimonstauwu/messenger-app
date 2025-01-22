import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

export const SocketContext = createContext()

// Returns value of the online users
export const useSocketContext = () =>{
  return useContext(SocketContext)
}
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const {authUser} = useAuthContext()

  useEffect(() => {
    if(authUser){ //If there's an existing user
      const socket = io("https://chat-app-qn5y.onrender.com", {
        query:{
          userId: authUser._id
        }
      }) //This is the backend socket connection
      
      setSocket(socket) // Socket here will be set to the one above

      socket.on("getOnlineUsers", (users) =>{
        setOnlineUsers(users)
      })
      //CLEANUP (LIKE THE ONE WHEN LOGGING OUT)
      return () => socket.close()
    } else{
      // Unauthorized users
      if(socket){
        socket.close()
        setSocket(null)
        // So the unauthorized users cannot access the socket for security reasons.
      }
    }
    
  }, [authUser])
  return <SocketContext.Provider value = {{socket, onlineUsers}}> {children}</SocketContext.Provider>
}