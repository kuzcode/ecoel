import{currentUser}from"@clerk/nextjs";
import{redirect}from"next/navigation";
import{fetchUser}from"@/lib/actions/user.actions";
import AccountProfile from"@/components/forms/AccountProfile";
async function Page(){
const user=await currentUser();
if(!user)return null;
const userInfo=await fetchUser(user.id);
if(userInfo?.onboarded)redirect("/");
const userData={id: user.id,objectId: userInfo?._id,username: userInfo ? userInfo?.username : user.username,name: userInfo ? userInfo?.name : user.firstName ??"",bio: userInfo ? userInfo?.bio :"",image: userInfo ? userInfo?.image : user.imageUrl,verif: userInfo? userInfo?.verif : false,};
return(<main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
<h1 className='head-text'>Регистрация ЭкоЭл Journal</h1>
<p className='mt-3 text-base-regular text-light-2'>Создайте ваш аккаунт для ЭкоЭл Journal ✨</p>
<section className='rounded-3xl mt-9 bg-dark-2 p-10'><AccountProfile user={userData}btnTitle='Продолжить'/></section>
</main>)}
export default Page;