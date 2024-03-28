import{currentUser}from "@clerk/nextjs";
import{redirect}from "next/navigation";
import{profileTabs}from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import{Tabs,TabsContent}from "@/components/ui/tabs";
import{fetchUser}from "@/lib/actions/user.actions";
async function Page({params}:{params:{id:string}}){
const user=await currentUser();
if(!user)return null;
const userInfo=await fetchUser(params.id);
if(!userInfo?.onboarded)redirect("/onboarding");
return(<section><ProfileHeader
accountId={userInfo.id}authUserId={user.id}name={userInfo.name}imgUrl={userInfo.image}bio={userInfo.bio}username={userInfo.username}verif={userInfo.verif}/>
<div className='mt-9'>
<Tabs defaultValue='threads' className='w-full'>
{profileTabs.map((tab)=>(
<TabsContent key={`content-${tab.label}`}value={tab.value}className='w-full text-light-1'>
{/* @ts-ignore */}
<ThreadsTab
currentUserId={user.id}accountId={userInfo.id}accountType='User'/>
</TabsContent>
))}</Tabs></div></section>);}
export default Page;