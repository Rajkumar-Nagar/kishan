"use client"

import Link from "next/link"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { checkEmptyField } from "@/lib/utils";
import { signIn } from "next-auth/react";


export default function SignIn() {

  const [errMessage, seterrMessage] = useState("")
  const [isloading, setIsloading] = useState(false)
  const [showPassword, setshowPassword] = useState(false)
  const router = useRouter()


  const handelSignIn = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata.entries()) as Record<string, string>;

    const err = checkEmptyField(data);

    if (err) {
      seterrMessage(err)
      return
    };
    const { phoneNumber, password } = data;

    if (phoneNumber.length != 10) {
      seterrMessage("please enter 10 number ")
    }

    if (!!errMessage) return;

    try {
      setIsloading(true)
      signIn('credentials', {
        phoneNumber,
        password,
        redirect: false,
      });
      router.replace("/")
    } catch (error) {
      seterrMessage("Invalid Credentials")
    } finally {
      setIsloading(false)
    }
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");

    if (value !== numericValue) {
      seterrMessage("Please enter valid number");
    } else {
      seterrMessage("");
    }

    e.target.value = numericValue;
  };


  return (
    <div className="mainContainer w-full flex flex-row h-full"
      style={{
        backgroundImage: "url(/signIn.jpg)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative backdrop-blur-sm w-full h-full flex md:p-8 sm:p-6 p-0  text-white">

        <div className="w-full h-full shadow-lg  flex flex-col md:flex-row rounded-md overflow-hidden" >

          <div className="form md:w-1/3 w-full h-full order-2 md:order-1 flex flex-col items-center md:justify-center pt-6 bg-[#7ab96c]">

            <div className="welcome hidden md:block">
              <Image alt="reload" width={150} height={150} src={"/LoginLogo.png"} />
            </div>

            <form
              onSubmit={handelSignIn}
              className="flex flex-col justify-center xl:px-24 sm:px-10 px-6 w-full md:min-w-72 items-center space-y-2 pt-6 pb-4"
            >
              <label className="flex flex-col w-full space-y-1">
                Phone Number
                <input maxLength={10} onChange={handlePhoneNumberChange} name="phoneNumber" type="text" className="w-full h-8 rounded-sm text-black px-2 " />
              </label>
              <label className="flex flex-col w-full space-y-1 relative ">
                Password
                <input name="password" type={showPassword ? "text" : "password"} className=" h-8 w-full rounded-sm text-black px-2" />
                <button type="button" className="absolute right-3 top-1/2" onClick={() => setshowPassword(!showPassword)}>
                  <Image width={20} height={20} alt="reload" src={showPassword ? "/eye.png" : "/view.png"} />
                </button>
              </label>

              {/* <span>Or</span>

              <label className="flex flex-col space-y-1">
                Otp
                <InputOTPPattern />
              </label> */}

              <div className="w-full py-3">

                <Button disabled={isloading} type="submit" variant={"Login"}>
                  {
                    isloading ? "loading..." : "Login"
                  }
                </Button>
              </div>

            </form>

            {
              errMessage &&
              <h1 className="text-red-500 text-base font-bold">{errMessage}</h1>
            }

            <div className="flex flex-row flex-wrap">
              <h1>Dont have a Account?&nbsp;</h1>
              <Link href={"/signup"} className="underline">Register</Link>
            </div>
          </div>

          <div className="photo_container bg-top h-[80%] md:h-full  order-1 md:order-2 md:bg-top sm:bg-center w-full md:w-2/3 bg-orange-300 "
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
