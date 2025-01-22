import express from 'express'
import { getUsersForSidebar } from '../controllers/user.controller.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()

router.get("/", protectRoute, getUsersForSidebar) //In order to show users in the main page, while the route is protected (only those authorized can access)
// Basically the url is the route as it is

export default router