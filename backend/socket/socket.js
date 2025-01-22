import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
// express server itself
const server = http.createServer(app)
//The express server needs to be in http before coating it with socket.io server (localhost)
const io = new Server(server,{
  cors:{
    origin:["http://localhost:3000"],
    methods:["GET", "POST"]
    // CORS TO AVOID ERRORS:
    // origin for frontend host
    // methods for http requests
  }
})
// This is for getting the socket id from the user socket map
export const getReceiverSocketId = (receiverId) =>{
  return userSocketMap[receiverId]
}

const userSocketMap = {} // userId is the key, while socketId is the value

io.on('connection', (socket) =>{
  console.log("a user connected: ", socket.id)
  
  const userId = socket.handshake.query.userId
  // The user id is gotten from authUser and is transported here through the socket
  if(userId != "undefined") userSocketMap[userId] = socket.id
  //user id and socket id will be connected here from the frontend to backend to check the connected users
  
  //Emit sends all events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap))
  // This will be able to get the online users through that socket map, which can be sorted out later on from offline and online

  //socket.on - used for listening to events in the server and frontend
  socket.on("disconnect", () => {
    console.log("a user disconnected: ", socket.id)
    // The socket map will also be deleted of the info of this user once the user disconnects based on the user that disconnected
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    // The offline ones are the ones that got deleted
  })
})
//The express server is coated with the socket.io Server

export {app, io, server}