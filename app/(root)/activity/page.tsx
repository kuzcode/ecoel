import Image from "next/image";
import Link from "next/link";
import{currentUser}from"@clerk/nextjs";
import{redirect}from"next/navigation";
import{fetchUser,getActivity}from"@/lib/actions/user.actions";
async function Page(){
const user=await currentUser();
if(!user)return null;
const userInfo=await fetchUser(user.id);
if(!userInfo?.onboarded)redirect("/onboarding");
const activity=await getActivity(userInfo._id);
return(<>
<h1 className='head-text text-left'>Уведомления</h1>
<p className='mt-3 text-base-regular text-light-2 bottom24px'>Будьте в курсе ✨</p>
<section className='mt-10 flex flex-col gap-5'>
{activity.length>0?(<>
{activity.map((activity)=>(
<Link key={activity._id}href={`/thread/${activity.parentId}`}>
<article className='activity-card rounded-3xl'>
<Image src={activity.author.image}alt='user_logo' width={20}height={20}className='rounded-full object-cover'/>
<p className='!text-small-regular text-light-1'><span className='mr-1 text-primary-500'>{activity.author.name}</span>{" "}ответил(-а) на вашу запись</p>
</article></Link>))}</>):(<p className='!text-base-regular text-light-3'>Уведомлений пока нет</p>)}</section></>);}
export default Page;