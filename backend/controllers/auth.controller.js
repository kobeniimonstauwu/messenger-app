import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'



export const login = async(req, res) => {
  try{
    const {username, password} = req.body
    const user = await User.findOne({username})
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "") //comparing user input, and encrypted user pass in database
    // The empty string is for users that don't exist, also for avoiding the original bcrypt error message

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: "Invalid Credentials"})
    }
    
    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    })
  }
  catch(error){
    console.log("Error in login controller: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }

}

export const logout = (req, res) => {
  try{
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "Logged Out Successfully"})
  }
  catch(error){
    console.log("Error in logout controller: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }

}

export const signup = async(req, res) => {
  try{
    const {fullName, username, password, confirmPassword, gender} = req.body // These values can be taken through middleware
    
    //Checks the confirmed password
    if(password !== confirmPassword){
      return res.status(400).json({error: "Passwords do not match!"})
    }
    //Checks if user exists
    const user = await User.findOne({username})

    if(user){
      return res.status(400).json({error: "User already exists!"})
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10) //The higher the value the more secure, but takes more time to encrypt
    const hashedPassword = await bcrypt.hash(password, salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}` 
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}` // It will provide only one profile picture (placeholder api)

    // The object for a newly created user (Includes the whole generated data)
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic: girlProfilePic
    })

    if(newUser){ //This else if used for validation from other services like mongodb
      generateTokenAndSetCookie(newUser._id, res) // It isn't await since you don't get something from the database
      await newUser.save()

      res.status(201).json({
        _id: newUser._id, // MONGODB Generates this
        // It gets the info from the generated data of the newly created user
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
        
      })
    }
    else{
      res.status(400).json({error: "Invalid User Data"})
    }
  }
  catch(error){
    console.log("Error in signup controller: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}