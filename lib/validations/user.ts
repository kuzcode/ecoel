import * as z from "zod";
export const UserValidation=z.object({
profile_photo:z.string().url().nonempty(),
name:z
.string()
.min(3,{message:"Минимум 3 символа."})
.max(24,{message:"Максимум 24 символа."}),
username:z
.string()
.min(4,{message:"Минимум 4 символа."})
.max(24,{message:"Максимум 24 символа."}),
bio:z
.string()
.min(0,{message:"Минимум 0 символов."})
.max(512,{message:"Максимум 512 символов."}),
});
