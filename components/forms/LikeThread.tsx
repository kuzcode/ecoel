"use client";
import Image from"next/image";
import{useEffect,useState}from'react';
import{likeThread,dislikeThread}from"@/lib/actions/thread.actions";
interface Props{threadId:string;currentUserId:string;parentId:string|null;isComment?:boolean;likes:Array<string>}
function LikeThread({threadId,currentUserId,parentId,isComment,likes}:Props){
const[count,setCount]=useState(likes.length);
useEffect(()=>{},[count]);
if(likes.includes(currentUserId)){
return(<><p className='mt-1 text-subtle-medium text-gray-1 right2px'>{count}</p><Image
src={`/assets/heart-filled.svg`}alt='heart'width={22}height={22}className='cursor-pointer object-contain likeImg hoverScale'
onClick={async()=>{
if(likes.includes(currentUserId)){
setCount(count-1);likes.splice(likes.indexOf(currentUserId))
}else{setCount(count+1);likes.push(currentUserId)}
await dislikeThread(JSON.parse(threadId),currentUserId,likes);if(!parentId||!isComment){}}}/></>)}else{return(
<><p className='mt-1 text-subtle-medium text-gray-1 right2px'>{count}</p><Image
src='/assets/heart-gray.svg'alt='heart'width={22}height={22}className='cursor-pointer object-contain likeImg hoverScale'onClick={async()=>{
if(likes.includes(currentUserId)){
setCount(count-1);
var index=likes.indexOf(currentUserId)
likes.splice(index)}
else{setCount(count+1);likes.push(currentUserId)}
await likeThread(JSON.parse(threadId),currentUserId,likes);
if(!parentId||!isComment){
}}}/></>);}}export default LikeThread;
