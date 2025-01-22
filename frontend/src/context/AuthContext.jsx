import { createContext, useState, useContext} from "react";

export const AuthContext = createContext()

export const useAuthContext = () =>{
  return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) =>{
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
  // JSON PARSE will turn the string into an object
  // THE DEFUALT VALUE OF THIS STATE IS THE LOCALSTORAGE USER INFO OBJECT
  return <AuthContext.Provider value ={{authUser, setAuthUser}}>
    {children}

  </ AuthContext.Provider>

  // The ability to use the user info through the auth context provider is thanks to the state, in which this will be wrapped in main.jsx
}