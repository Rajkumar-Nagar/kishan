"use client"

import Link from "next/link"

import { useState } from "react";
import { loginServerAction } from "@/actions/loginAction";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import InputOTPPattern from "@/components/OtpModel";


export default function SignIn() {

  const [errMessage, seterrMessage] = useState("")
  const router = useRouter()

  const checkFilled = (field: any) => {
    if (!field) {
      seterrMessage(`please enter the ${field}`)
    }
  }
  const handelSignIn = async (formdata: any) => {

    const { phoneNumber, password } = Object.fromEntries(formdata.entries());

    checkFilled(phoneNumber);
    checkFilled(password);

    if (!!errMessage) {
      return
    }

    try {

      await loginServerAction(formdata);
      router.replace("/")
    } catch (error) {
      seterrMessage("invalid credential")
    }
  }


  return (
    <div className="mainContainer w-full flex flex-row h-full   -z-10"
      style={{
        backgroundImage: "url(/signIn.jpg)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >

      {/* <div
        className="absolute inset-0 bg-gray-800 bg-opacity-50 blur-md"
        style={{ zIndex: 1 }}
      /> */}

      <div className="relative backdrop-blur-sm w-full h-full flex  z-10 rounded-md p-8 text-white">

        <div className="w-full h-full shadow-lg flex" >
          <div className="form w-1/3 flex flex-col items-center rounded-md  pt-6 bg-[#7ab96c]">

            <div className="welcome">
              <Image alt="reload" width={150} height={150} src={"/loginLogo.png"} />
            </div>

            <form
              action={handelSignIn}
              className="flex flex-col justify-center items-center space-y-2  pt-6 pb-4"
            >
              <label className="flex flex-col space-y-1">
                Phone Number
                <input name="phoneNumber" type="text" className="w-60 h-8 rounded-sm text-black px-2 " />
              </label>

              <label className="flex flex-col space-y-1">
                Password
                <input name="password" type="password" className="w-60 h-8 rounded-sm text-black px-2" />
              </label>

              <span>Or</span>


              <label className="flex flex-col space-y-1">
                Otp
                <InputOTPPattern />
              </label>

              <Button className={buttonVariants({ variant: "Login" })}>
                <Link href="/">Login</Link>
              </Button>

            </form>

            {
              errMessage &&
              <h1 className="text-red-500 text-base font-bold">{errMessage}</h1>
            }

            <div className="flex flex-row ">
              <h1>Dont have a Account?</h1>
              <Link href={"/signup"} className="underline">Resister</Link>
            </div>

          </div>

          <div className="photo_container rounded-md w-2/3 bg-orange-300 h-full"
            style={{
              backgroundImage: "url(/signIn.jpg)",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              // backgroundPosition: '',
            }}>

          </div>
        </div>

      </div>
    </div>
  )
}
