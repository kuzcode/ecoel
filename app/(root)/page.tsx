import{currentUser}from"@clerk/nextjs";import{redirect}from"next/navigation";import ThreadCard from"@/components/cards/ThreadCard";import Pagination from"@/components/shared/Pagination";import Footer from"@/components/shared/Footer";import{fetchPosts}from"@/lib/actions/thread.actions";import{fetchUser}from"@/lib/actions/user.actions";
async function Home({searchParams,}:{searchParams:{[key:string]:string|undefined};}){
const user=await currentUser();
if(!user)return null;
const userInfo=await fetchUser(user.id);
if(!userInfo?.onboarded)redirect("/onboarding");
const result=await fetchPosts(searchParams.page?+searchParams.page:1,15);
return(<><link rel="icon"href="../logo.png"sizes="32x32"/><h1 className='head-text text-left'>Главная</h1><p className='mt-3 text-base-regular text-light-2'>Любая мысль ✨</p>
<section className='mt-9 flex flex-col gap-10'>
{result.posts.length===0?(
<p className='no-result'>Записи не найдены</p>):(<>{result.posts.map((post)=>(
<ThreadCard key={post._id}id={post._id}currentUserId={user.id}parentId={post.parentId}content={post.text}author={post.author}createdAt={post.createdAt}comments={post.children}likes={post.likes}isAnonym={post.isAnonym}/>))}</>)}</section>
<Pagination
path='/'pageNumber={searchParams?.page?+searchParams.page:1}isNext={result.isNext}/><Footer/></>)}
export default Home;