import { comparePassword, hashPassword } from "../helpers/userHelpers.js"
import User from "../models/userModel.js"
import JWT from "jsonwebtoken"

const registerUser = async(req,res)=>{
    try {
        const {name,email,password,phone,address} = req.body
        //Validation
        if(!name){
            return res.send({error:"Name is required"})
        }
        if(!email){
            return res.send({error:"Email is required"})
        }
        if(!password){
            return res.send({error:"Password is required"})
        }
        if(!phone){
            return res.send({error:"Phone is required"})
        }
        if(!address){
            return res.send({error:"Address is required"})
        }

        const emailExist = await User.findOne({email})
        if(emailExist){
            return res.status(200).send({
                Message:"Already registered please login",
                success:true
            })
        }

        const hashedPassword = await hashPassword(password)

        //save in db
        const user = await new User({name,email,phone,address,password:hashedPassword}).save()
        
        user.password = undefined

        res.status(200).send({
            message:"User register successfully..",
            success:true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Registration failed..",
            success:false,
            error
        })
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        //Email validate and get the password 
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({
                message:"Email is not registered",
                success:false
            })
        }

        //match the password 
        const validpassword = await comparePassword(password,user.password)
        if(!validpassword){
            return res.status(4040).send({
                message:"Invalid password",
                success:false
            })
        }

        //generate token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,
        {
            expiresIn:'7d'
        })
        
        res.status(200).send({
            message:"Login successfully",
            success:true,
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Failed to login",
            success:false
        })
    }
}

const test = async(req,res)=>{
    res.send("Protected route")
}
export {
    registerUser,
    login,
    test
}