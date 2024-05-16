import { hashPassword } from "../helpers/userHelpers.js"
import User from "../models/userModel.js"

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

export {
    registerUser,
}