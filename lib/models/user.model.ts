import mongoose from"mongoose";const userSchema=new mongoose.Schema({id:{type:String,required:true},username:{type:String,unique:true,required:true},name:{type:String,required:true},verif:{type:Boolean,default:false,},clusters:{type:Array,default:[]},image:String,bio:String,threads:[{type:mongoose.Schema.Types.ObjectId,ref:"Thread"}],onboarded:{type:Boolean,default:false},});
const User=mongoose.models.User||mongoose.model("User",userSchema);
export default User;