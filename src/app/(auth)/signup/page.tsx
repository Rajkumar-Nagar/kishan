"use client"

import Link from "next/link";
import { useState } from "react";
import { handelSignInActions } from "@/actions/SignInActinon";

export default function SignIn() {

  const [errMessage, seterrMessage] = useState("")

  const checkFilled = (field: any) => {
    if (!field) {
      seterrMessage(`please enter the ${field}`)
    }
  }
  const handelSignIn = async (formdata: FormData) => {

    const { name, phoneNumber, email, Address, password, confirm_Password } = Object.fromEntries(formdata.entries());

    checkFilled(name);
    checkFilled(phoneNumber);
    checkFilled(Address)
    checkFilled(password)
    checkFilled(confirm_Password);

    if (password != confirm_Password) {
      seterrMessage("please enter same password");
      return;
    }

    if (!!errMessage) {
      return
    }

    const actionResponse = await handelSignInActions(formdata)

    return actionResponse

  }




  return (

    <div className="mainContainer w-full flex flex-row">

      <div className="form w-1/3 flex flex-col items-center justify-center bg-slate-600">
        <form
          action={handelSignIn}
          className="flex flex-col justify-center items-center space-y-5 py-9"
        >
          <label className="flex flex-col space-y-1">
            Name
            <input name="name" type="text" className="w-60 h-7 " />
          </label>
          <label className="flex flex-col space-y-1">
            Phone Number
            <input name="phoneNumber" type="number" className="w-60 h-7 " />
          </label>
          <label className="flex flex-col space-y-1">
            Email
            <input name="email" type="email" className="w-60 h-7 " />
          </label>
          <label className="flex flex-col space-y-1">
            Address
            <input name="Address" type="email" className="w-60 h-7 " />
          </label>
          <label className="flex flex-col space-y-1">
            Password
            <input name="password" type="password" className="w-60 h-7 " />
          </label>
          <label className="flex flex-col space-y-1">
            confirm Password
            <input name="confirm_Password" type="text" className="w-60 h-7 " />
          </label>
          <button className="bg-amber-600">Sign In</button>
        </form>

        {
          errMessage &&
          <h1 className="text-red-500 text-xl font-bold">{errMessage}</h1>
        }
        <div className="flex flex-row py-3">
          <h1>Already have a Accoutn?</h1>
          <Link href={"/login"} className="underline">Login</Link>
        </div>
      </div>
      <div className="photo_container w-2/3 bg-orange-300 h-full">
        <h1>sfdjsdfj</h1>
      </div>
    </div>
  )
}

