// JS extension only needed for hooks that only serve the purpose of returning values or passing data
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
  const [loading, setLoading] = useState(false)
  // Default is false
  const { setAuthUser } = useAuthContext()
  // The values in the AuthContext file can be used here through this function

  const signup = async({fullName, username, password, confirmPassword, gender}) =>{
    const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
    if(!success) return

    setLoading(true)
    try{
      // No need for localhost since it's already prefixed through the proxy in the vite config
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fullName, username, password, confirmPassword, gender})
      })
      // IT CAN ONLY GET DATA THAT THE BACKEND RESPONDS TO

      const data = await res.json() // It gets the string json data from the response from the hit api route
      if(data.error){
        //If the response itself has errors, it adds to catch of the toast error to add this specific error to show up in the screen
        throw new Error(data.error)
      }

      // -------------- STORE USER TO LOCAL STORAGE ---------------- 
      // Used for the browser to know whether you're logged in /signed up or not and get you to the homepage
      localStorage.setItem("chat-user", JSON.stringify(data))

      // //UPDATE CONTEXT
      setAuthUser(data)
      // This basically gets the data of the user, which can be used in the frontend

      // Since we're signing up, we only need to set the data to the local storage, also by using the useAuthContext
    }
    catch(error){
      toast.error(error.message)
    }
    finally{
      setLoading(false)
      // It will only be false once either are completed 
    }
  }
  return {loading, signup}
}

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
  if(!fullName || !username || !password || !confirmPassword || !gender){
    toast.error('Please fill in all the fields')
    return false
  }
  if(password !== confirmPassword){
    toast.error("Passwords do not match")
    return false
  }
  if(password.length < 6){
    toast.error("Password must be at least 6 characters")
    return false
  }

  return true
}