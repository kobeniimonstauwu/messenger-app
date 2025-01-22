import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import express from 'express'
import connectToMongoDB from './db/connectToMongoDB.js'


import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import { app, server } from './socket/socket.js'

import path from "path"

dotenv.config()


const PORT = process.env.PORT || 5000


const __dirname = path.resolve()

// The Middlewares are "app.use"

app.use(express.json()) //Parses json payloads (From req.body)
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

// dirname is the root, then goes to frontend, this path is needed for building 
// This path will be used to generate the build command the static files which is located in the frontend/dist
app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req, res) =>{
    // Other url that isn't above will send the user to the index page
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})
// Before building, we need the node_modules installed in our deployed app for both backend and frontend before we install dependencies and run the deployed web app
// While in package.json, backend's build command builds both backend then frontend, which installs all dependencies for both, and runs the build command of frontend

// app.get("/", (req, res) => {
//     //root route http://locahost:5000/
//     res.send("Hello Worlds")
// })


server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})