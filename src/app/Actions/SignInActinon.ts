"use server"

import { signIn } from "@/auth";

export  const handelSignInActions = async (formdata: any) => {
    "use server"

    const { name, phoneNumber, email, Address, password, confirm_Password } = Object.fromEntries(formdata.entries());

    const response = await fetch("http://localhost:3000/api/auth/signUp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phoneNumber: phoneNumber,
        email,
        address: Address,
        password
      }),
    })


    if (!response.ok) {
      console.log("Loged in Error")
      return
    }

    const data = await response.json();

    const result = await signIn('credentials', {
      redirect: false,
      phoneNumber,
      password
    });

    return {
      message: "user resister successfully",
      result
    }

  }
