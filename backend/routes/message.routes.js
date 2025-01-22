import express from 'express'
import protectRoute  from '../middleware/protectRoute.js'
import { sendMessage, getMessages } from '../controllers/message.controller.js'

const router = express.Router()

router.get("/:id", protectRoute, getMessages) // Get can get many messages since you'll need to get every message from the array
router.post("/send/:id", protectRoute, sendMessage) // Unlike get, you can only send messages once
//protectRoute is an authorization, before it sends a message

export default router