"use server";
import{revalidatePath}from"next/cache";
import{connectToDB}from"../mongoose";
import User from"../models/user.model";
import Thread from"../models/thread.model";
export async function fetchPosts(pageNumber=1,pageSize=20){
connectToDB();
const skipAmount=(pageNumber - 1)* pageSize;
const postsQuery=Thread.find({parentId:{$in:[null,undefined]}})
.sort({createdAt:"desc"})
.skip(skipAmount)
.limit(pageSize)
.populate({
path:"author",model:User,})
.populate({
path:"children",populate:{
path:"author",model:User,select:"_id name parentId image",},});
const totalPostsCount=await Thread.countDocuments({
parentId:{$in:[null,undefined]},});
const posts=await postsQuery.exec();
const isNext=totalPostsCount > skipAmount + posts.length;
return{posts,isNext};}
interface Params{
text:string,author:string,path:string,likes:Array<string>,isAnonym:boolean,}
export async function createThread({text,author,path,likes,isAnonym}:Params){try{
connectToDB();
const createdThread=await Thread.create({
text,author,path,likes,isAnonym,});
if(isAnonym==false){
await User.findByIdAndUpdate(author,{
$push:{threads:createdThread._id}})}
revalidatePath(path);}catch(error:any){
throw new Error(`Failed to create thread:${error.message}`);}}
async function fetchAllChildThreads(threadId:string):Promise<any[]>{
const childThreads=await Thread.find({parentId:threadId});
const descendantThreads=[];
for(const childThread of childThreads){
const descendants=await fetchAllChildThreads(childThread._id);
descendantThreads.push(childThread,...descendants);}
return descendantThreads;}
export async function likeThread(id:string,currentUserId:string,likes:Array<string>):Promise<void>{
try{
connectToDB();
const mainThread=await Thread.findById(id).populate("");
if(!mainThread){
throw new Error("Thread not found");}
const likedThread=await Thread.findByIdAndUpdate(
id,{$addToSet:{likes:currentUserId}},{new:true}
);}catch(error:any){
throw new Error(`Failed to like thread:${error.message}`);}}
export async function dislikeThread(id:string,currentUserId:string,likes:Array<string>):Promise<void>{
try{
connectToDB();
const mainThread=await Thread.findById(id).populate("");
if(!mainThread){
throw new Error("Thread not found");}
var index=likes.indexOf(currentUserId);
likes.splice(index,999);
const dislikedThread=await Thread.findByIdAndUpdate(
id,{$pull:{likes:currentUserId}},{new:true}
);}catch(error:any){
throw new Error(`Failed to like thread:${error.message}`);}}
export async function deleteThread(id:string,path:string):Promise<void>{
try{
connectToDB();
const mainThread=await Thread.findById(id).populate("");
if(!mainThread){
throw new Error("Thread not found");}
const descendantThreads=await fetchAllChildThreads(id);
const descendantThreadIds=[
id,...descendantThreads.map((thread)=> thread._id),];
const uniqueAuthorIds=new Set([...descendantThreads.map((thread)=> thread.author?._id?.toString()),// Use optional chaining to handle possible undefined values
mainThread.author?._id?.toString(),].filter((id)=> id !==undefined));
await Thread.deleteMany({_id:{$in:descendantThreadIds}});
await User.updateMany(
{_id:{$in:Array.from(uniqueAuthorIds)}},{$pull:{threads:{$in:descendantThreadIds}}}
);
revalidatePath(path);}catch(error:any){
throw new Error(`Failed to delete thread:${error.message}`);}}
export async function fetchThreadById(threadId:string){
connectToDB();
try{
const thread=await Thread.findById(threadId)
.populate({
path:"author",model:User,select:"_id id name image",})
.populate({
path:"children",populate:[{
path:"author",model:User,select:"_id id name parentId image",},{
path:"children",model:Thread,populate:{
path:"author",model:User,select:"_id id name parentId image",},},],})
.exec();
return thread;}catch(err){
console.error("Error while fetching thread:",err);
throw new Error("Unable to fetch thread");}}
export async function addCommentToThread(
threadId:string,commentText:string,userId:string,path:string,){
connectToDB();
try{
const originalThread=await Thread.findById(threadId);
if(!originalThread){
throw new Error("Thread not found");}
const commentThread=new Thread({
text:commentText,author:userId,parentId:threadId,likes:[],});
const savedCommentThread=await commentThread.save();
originalThread.children.push(savedCommentThread._id);
await originalThread.save();
revalidatePath(path);}catch(err){
console.error("Error while adding comment:",err);
throw new Error("Unable to add comment");}}