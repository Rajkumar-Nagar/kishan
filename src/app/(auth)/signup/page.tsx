"use client"

import Link from "next/link";
import { useState } from "react";
import { handelSignInActions } from "@/actions/SignInActinon";
import { Button } from "@/components/ui/button";
import { checkEmptyField } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function SignIn() {

  const router = useRouter()
  const [errMessage, seterrMessage] = useState("")
  const [isloading, setIsloading] = useState(false)
  const [showPassword, setshowPassword] = useState(false)



  const handelSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formdata.entries()) as Record<string, string>;

    const { password, confirm_Password, phoneNumber, name, address } = data;

    const err = checkEmptyField({ name, phoneNumber, address, password, confirm_Password, });
    if (err) {
      seterrMessage(err);
      return;
    }
    if (phoneNumber.length != 10) {
      seterrMessage("please enter 10 number");
    }
    if (password != confirm_Password) {
      seterrMessage("please enter same password");
    }

    if (!!errMessage) return;


    setIsloading(true)

    try {
      const actionResponse = await handelSignInActions(formdata)

      router.replace("/")
    } catch (error: any) {
      seterrMessage(error?.message)
    }
    finally {
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
        backgroundImage: "url(/resister.jpg)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative backdrop-blur-sm w-full h-full flex md:p-8 p-6 text-white">
        <div className="w-full h-full flex flex-col md:flex-row shadow-lg rounded-md overflow-hidden" >
          <div className="form md:w-1/3 md:min-w-64 w-full order-2 md:order-1 pt-7  flex flex-col items-center h-full md:justify-center bg-[#7ab96c]">

            <form
              onSubmit={handelSignIn}
              className="flex flex-col w-full  px-10 md:w-80 lg:w-96 lg:min-w-60 space-y-2 "
            >
              <label className="flex flex-col w-full space-y-1">
                Name
                <input name="name" type="text" className="h-8 w-full rounded-sm text-black px-2 " />
              </label>
              <label className="flex flex-col w-full space-y-1">
                Phone Number
                <input name="phoneNumber" maxLength={10} type="text" onChange={handlePhoneNumberChange} className="w-60 h-8 rounded-sm text-black px-2 w-full " />
              </label>
              <label className="flex flex-col w-full space-y-1">
                Email(optional)
                <input name="email" type="email" className="h-8 w-full rounded-sm text-black px-2 " />
              </label>
              <label className="flex flex-col w-full space-y-1">
                Address
                <input name="address" type="text" className="h-8 w-full rounded-sm text-black px-2 " />
              </label>

              <label className="flex flex-col w-full space-y-1 relative ">
                Password
                <input name="password" type={showPassword ? "text" : "password"} className=" h-8 w-full rounded-sm text-black px-2" />
                <button type="button" className="absolute right-3 top-1/2" onClick={() => setshowPassword(!showPassword)}>
                  <Image width={20} height={20} alt="reload" src={showPassword ? "/eye.png" : "/view.png"} />
                </button>
              </label>

              <label className="flex flex-col w-full space-y-1">
                confirm Password
                <input name="confirm_Password" type="text" className="h-8 w-full rounded-sm text-black px-2" />
              </label>


              <div className="w-full py-3">

                <Button disabled={isloading} type="submit" variant={"Login"}>
                  {
                    isloading ? "loading..." : "Register"
                  }
                </Button>
              </div>
            </form>
            {
              errMessage &&
              <h1 className="text-red-500 text-base font-bold">{errMessage}</h1>
            }

            <div className="flex flex-row ">
              <h1> Already have an Account?&nbsp;</h1>
              <Link href={"/login"} className="underline">Login</Link>
            </div>

          </div>

          <div className="photo_container md:w-2/3 order-1 h-[50%] bg-center sm:bg-top  md:order-2 w-full bg-orange-300 md:h-full"
            style={{
              backgroundImage: "url(/resister.jpg)",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              // backgroundPosition: "20% 42%",
            }}>

          </div>

        </div>
      </div>

    </div>
  )
}

