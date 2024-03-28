import{currentUser}from"@clerk/nextjs";import{redirect}from"next/navigation";import PostThread from"@/components/forms/PostThread";import{fetchUser}from"@/lib/actions/user.actions";async function Page(){const user=await currentUser();if(!user)return null;const userInfo=await fetchUser(user.id);if(!userInfo?.onboarded)redirect("/onboarding");return(<><h1 className='head-text'>Создание записи</h1><p className='mt-3 text-base-regular text-light-2'>Любая мысль ✨</p><PostThread userId={userInfo._id}likes={[]}name={userInfo.name}/></>)}export default Page;