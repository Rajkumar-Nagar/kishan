"use server"

import { signIn } from "@/auth";

export const loginServerAction=async(formdata:any)=>{

 
     const {phoneNumber,password}=Object.fromEntries(formdata.entries());
 
     const result = await signIn('credentials', {
       redirect: false,
       phoneNumber,
       password,
       callbackUrl:'/'
     });
 
     if (result.error) {
         throw  Error("invalid credintial")
     }
}