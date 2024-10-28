"use server"

import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

export const loginServerAction = async (formdata: FormData) => {
  const { phoneNumber, password } = Object.fromEntries(formdata.entries());

  const result = await signIn('credentials', {
    redirect: false,
    phoneNumber,
    password,
    callbackUrl: '/'
  });
  revalidatePath('/', 'layout');
  if (result.error) {
    throw Error("invalid credintial")
  }
}