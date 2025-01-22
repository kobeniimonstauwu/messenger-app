import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req, res, next) => {
  try{
    const token = req.cookies.jwt // go to server.js first to get the token
    //in the cookie through the cookie-parser, once activated through middleware
    // It would be able to get the data here
    if(!token){
      return res.status(401).json({error: "Unauthorized - No Token Provided"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) //This will verify the
    //token you got from a user and it will check decode the registered user


  if(!decoded){
    return res.status(401).json({error: "Unauthorized - Invalid Token"})
  }

  const user = await User.findById(decoded.userId).select("-password") // the decoded should have
  // the same name as it was signed "userId"
  // The password is not included in getting the data from this authorization
  // for security measures
  if(!user){
    return res.status(404).json({error: "User Not Found"})
  }

  req.user = user // It will setup the req.user to be used in the message
  // controller

  next() // so it will still run the next function, the sendMessage
  // once the authorization/protection is successful
}
  catch(error){
    console.log("Error in protectRoute middleware: ", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

export default protectRoute