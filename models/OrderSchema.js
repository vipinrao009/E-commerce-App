import { model,Schema,mongoose} from "mongoose";

const orderSchema = new Schema({
    products:[
        {
            type:mongoose.ObjectId,
            ref:"Product"
        }
    ],
    payments:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing", "Shipped", "Deliverd", "Canceled"]
    }
},{timestamps:true})

const Order = model("Order",orderSchema)

export default Order