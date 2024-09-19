import express from "express"
import { login, registerUser, test, forgotPassword, updateProfile } from "../controllers/userController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"

const router = express.Router()

//Register controller
router.post("/register",registerUser)
router.post("/login",login)
router.post("/forgot-password",forgotPassword)

router.get("/test",requireSignIn,isAdmin, test)


//Protected user routes
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).json({
        ok:true
    })
})

//Protected admin routes
router.get("/admin-auth",requireSignIn,isAdmin ,(req,res)=>{
    res.status(200).json({
        ok:true
    })
})
 
router.put("/update-profile",requireSignIn,updateProfile)

export default router