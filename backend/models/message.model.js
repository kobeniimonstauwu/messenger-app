import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  senderId:{ //The user that sends the message
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // Basically it's an id referenced to the user model
    required: true
  },
  receiverId:{ //The user that sends the message
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // Basically it's an id referenced to the user model
    required: true
  },
  message:{ //The user that sends the message
    type: String,
    required: true
  }
  // Having timestamps set to true will make mongoose automatically created "Created At" and "Updated At"
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema)

export default Message