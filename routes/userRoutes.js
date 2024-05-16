import express from "express"
import { registerUser } from "../controllers/userController.js"

const router = express.Router()

//Register controller
router.post("/register",registerUser)

export default router