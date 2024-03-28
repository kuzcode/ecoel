import * as z from"zod";
export const ThreadValidation=z.object({
thread:z.string().nonempty().min(3,{message:"Минимум 3 символа."})
.max(256,{message:"Максимум 256 символов."}),
accountId:z.string(),});
export const CommentValidation=z.object({thread:z.string().nonempty().min(3,{message:"Минимум 3 символа."})
.max(256,{message:"Максимум 256 символов."}),});