"use client";
import Image from"next/image";import{usePathname,useRouter}from"next/navigation";import{deleteThread}from"@/lib/actions/thread.actions";
interface Props{threadId:string;currentUserId:string;authorId:string;parentId:string|null;isComment?:boolean;}
function DeleteThread({threadId,currentUserId,authorId,parentId,isComment,}:Props){
const pathname=usePathname();const router=useRouter();
if(currentUserId!==authorId||pathname==="/")return null;
async function startDeliting(){
var confirmDel=confirm('Вы действительно хотите удалить публикацию?')
if(confirmDel==true){
deleteThread(JSON.parse(threadId),pathname);
alert('Запись удалена:)')
if(!parentId||!isComment){router.push("/")}}
else{(confirmDel=false)}}
return(
<Image src='/assets/delete.svg'alt='delte' width={20}height={20}className='cursor-pointer object-contain' onClick={()=> startDeliting()}/>);}
export default DeleteThread;