import express from "express"
import { login, registerUser } from "../controllers/userController.js"

const router = express.Router()

//Register controller
router.post("/register",registerUser)
router.post("/login",login)

export default router