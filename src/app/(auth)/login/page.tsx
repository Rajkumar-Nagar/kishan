"use client"

import Link from "next/link"

import React, { useState } from "react";
import { loginServerAction } from "@/actions/loginAction";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import InputOTPPattern from "@/components/OtpModel";
import { checkEmptyField } from "@/lib/utils";


export default function SignIn() {

  const [errMessage, seterrMessage] = useState("")
  const [isloading, setIsloading] = useState(false)
  const router = useRouter()


  const handelSignIn = async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const formdata = new FormData(e.target as any)
    const data = Object.fromEntries(formdata.entries());

    const err = checkEmptyField(data);

    if(err){
      seterrMessage(err)
      return
    };

    const { phoneNumber, password } = data;
   
    if (!!errMessage) {
      return
    }

    try {
      setIsloading(true)
      await loginServerAction(formdata);
      setIsloading(false)
      router.replace("/")
    } catch (error) {
      seterrMessage("invalid credential")
    }
  }

  return (
    <div className="mainContainer w-full flex flex-row h-full"
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

      <div className="relative backdrop-blur-sm w-full h-full flex p-8 text-white">

        <div className="w-full h-full shadow-lg flex rounded-md overflow-hidden" >

          <div className="form w-1/3 flex flex-col items-center pt-6 bg-[#7ab96c]">

            <div className="welcome">
              <Image alt="reload" width={150} height={150} src={"/LoginLogo.png"} />
            </div>

            <form
              onSubmit={handelSignIn}
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

              <Button disabled={isloading} className={buttonVariants({ variant: "Login" })}>
                {
                  isloading ? "loading... " : "Login"
                }
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

          <div className="photo_container  w-2/3 bg-orange-300 h-full"
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
