import express from "express"
import { login, registerUser, test } from "../controllers/userController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"

const router = express.Router()

//Register controller
router.post("/register",registerUser)
router.post("/login",login)

router.get("/test",requireSignIn,isAdmin, test)

export default router