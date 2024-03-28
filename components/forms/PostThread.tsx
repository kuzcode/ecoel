"use client";import * as z from"zod";import{useForm}from"react-hook-form";import{zodResolver}from"@hookform/resolvers/zod";import{usePathname,useRouter}from"next/navigation";import{Form,FormControl,FormField,FormItem,FormLabel,FormMessage,}from"@/components/ui/form";import{Button}from"@/components/ui/button";import{Textarea}from"@/components/ui/textarea";import{ThreadValidation}from"@/lib/validations/thread";import{createThread}from"@/lib/actions/thread.actions";interface Props {userId:string;likes:Array<string>;name:string;}
var isAnonymSelect=false;var isLoading=false;function PostThread(this:any, { userId, likes, name }:Props) {
const router=useRouter();const pathname=usePathname();const form=useForm<z.infer<typeof ThreadValidation>>({
resolver:zodResolver(ThreadValidation),defaultValues:{thread:"",accountId:userId,},});const onSubmit=async(values:z.infer<typeof ThreadValidation>) => {
if(isAnonymSelect==false) {
await createThread({
text:values.thread,author:userId,path:pathname,likes:[],isAnonym:false,});}else{
await createThread({
text:values.thread,author:userId,path:pathname,likes:[],isAnonym:true,});}alert('Запись опубликована и видна всем :)')
router.push("/")};return(<Form {...form}><form
className='mt-10 flex flex-col justify-start gap-10'
onSubmit={form.handleSubmit(onSubmit)}><FormField
control={form.control}name='thread'render={({field}) =>(
<FormItem className='flex w-full flex-col gap-3'><FormLabel className='text-base-semibold text-light-2'>Содержимое записи:</FormLabel><FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 rounded-2xl'><Textarea rows={15}{...field} /></FormControl><FormMessage /></FormItem>)}/><div className="btnContainer">{isLoading?(
<Button onClick={()=>alert('Подождите, ваша запись публикуется...')} className='bg-primary-500 rounded-2xl btn'>Загрузка...</Button>):(
<Button onClick={()=>{isAnonymSelect=false;isLoading=true}}type='submit' className='bg-primary-500 rounded-2xl btn'>Опубликовать как {name}</Button>)}{isLoading?(
<Button onClick={()=>alert('Подождите, ваша запись публикуется...')} className='bg-primary-500 rounded-2xl btn'>Загрузка...</Button>):(
<Button onClick={()=>{isAnonymSelect=true;isLoading=true}}type='submit'className='bg-primary-500 rounded-2xl btn'>Опубликовать анонимно</Button>)}</div></form></Form>);}
export default PostThread;