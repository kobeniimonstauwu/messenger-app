import User from '../models/user.model.js'

// AUTHENTICATION IS DIFFERENT - IT'S JUST A SERVICE
export const getUsersForSidebar = async(req, res) => {
  try{
    const loggedInUserId = req.user._id

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password") // It will fetch all user ids except for the loggedInUserId(_id)

    res.status(200).json(filteredUsers) // This will basically return the filteredUsers 
  }
  catch(error){
    console.error("Error in getUsersForSidebar: ", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}