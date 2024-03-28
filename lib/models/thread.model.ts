import mongoose from"mongoose";import{boolean}from"zod";
const threadSchema=new mongoose.Schema({
text:{type:String,required:true},author:{
type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},likes:{
type:Array,required:true},createdAt:{
type:Date,default:Date.now},parentId:{
type:String},isAnonym:{
type:Boolean,default:false},children:[{type:mongoose.Schema.Types.ObjectId,ref:"Thread",},],});
const Thread=mongoose.models.Thread||mongoose.model("Thread",threadSchema);
export default Thread;