import express from "express"
import { login, registerUser, test, forgotPassword } from "../controllers/userController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"

const router = express.Router()

//Register controller
router.post("/register",registerUser)
router.post("/login",login)
router.post("/forgot-password",forgotPassword)

router.get("/test",requireSignIn,isAdmin, test)


//Protected routes
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).json({
        ok:true
    })
})

export default router