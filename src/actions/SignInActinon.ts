"use server"

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

export const handelSignInActions = async (formdata: FormData) => {
  const { name, phoneNumber, email, address, password } = Object.fromEntries(formdata.entries()) as Record<string, string>;

  if (!name || !phoneNumber || !address || !password) {
    throw new Error('Please fill all required filled')
  }

  const findUser = await prisma.user.findUnique({
    where: {
      phoneNumber,
    }
  })

  if (findUser) {
    throw new Error('user is already registered')
  }

  const saltRounds = parseInt(process.env.SALT_ROUND!, 10);
  if (isNaN(saltRounds)) {
    throw new Error('Invalid SALT_ROUND environment variable');
  }

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      name,
      phoneNumber,
      email,
      address,
      password: hashPassword,
    }
  });

  const result = await signIn('credentials', {
    redirect: false,
    phoneNumber,
    password
  });

  return {
    message: "user registered successfully",
    result
  }

}
