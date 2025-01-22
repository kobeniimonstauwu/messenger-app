import mongoose from 'mongoose'

const userSchema =  new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
  },
  username:{
    type: String, 
    required: true,
    unique: true
  },
  password:{
    type: String, 
    required: true,
    minlength: 6
  },
  gender:{
    type: String,
    required: true,
    enum:["male","female"] // Enum is used for values
  }
  ,
  profilePic:{
    type: String,
    default: ""
  }
}, {timestamps: true})

const User = mongoose.model("User", userSchema) // Models should be Capitalized in first letter

export default User