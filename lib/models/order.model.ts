import mongoose from"mongoose";
import { any } from "zod";
import User from "./user.model";

const orderSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
      },
    items:{type:Array,default:[]},
    place:{type:String,default:''},
    payment:{type:String,default:''}
})

const Order=mongoose.models.Order||mongoose.model("Order",orderSchema);

export default Order;