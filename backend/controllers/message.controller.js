import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
  try{
    const {message} = req.body 
    const {id: receiverId} = req.params // This is the id of the user you're sending a message to
    const senderId = req.user._id // This needs to be setup first in middleware - this is your id

    let conversation = await Conversation.findOne({ // This needs to be let and not const since the messages here are added
      participants: { $all: [senderId, receiverId] }
    })
    // It will find a conversation between two users
    // This includes all the messages
    // This is like the history of chat in messenger - first thing u'll see

    if(!conversation){ // This is for starting new conversations
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
        // No need for message since it already has a default
        // (For new messages) - it's a blank and will appear blank at first
      })
    }
    //creating / sending messages
    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    if(newMessage){
      conversation.messages.push(newMessage._id) //messages is an array, NOTE: this won't go into the database unless you save it
    }

    

    // await conversation.save()
    // await newMessage.save()

    //The two lines above can be replaced with this efficient code, since it runs at the same time
    await Promise.all([conversation.save(), newMessage.save()])

    //SOCKET IO FUNCTIONALITY goes here (realtime messages)
    const receiverSocketId = getReceiverSocketId(receiverId)
    // If receiver exists
    if(receiverSocketId){
      // It will specifically send an event to a certain user (receiver)
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }
    
    // It will create and save new collections in the database for both the conversation and message collection

    res.status(201).json(newMessage)
  }
  catch(error){
    console.log("Error in sendMessage controller: ", error.message)
    res.status(500).json({message: "Internal Server Error"})
  }
}

export const getMessages = async(req, res) => {
  try{
    const {id: userToChatId} = req.params //The user id we are communicating with
    const senderId = req.user._id // Our id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId ]}
    }).populate("messages") // NOT REFERENCE BUT ACTUAL MESSAGES, It doesn't give an array, but messages itself one by one (objects)

    if(!conversation) return res.status(200).json([])

    const messages = conversation.messages
    res.status(200).json(messages) 
  }
  catch(error){
    console.log("Error in getMessages controller: ", error.message)
    res.status(500).json({error: "Internal Server Error" })
  }
}