"use client"

import Link from "next/link";
import { useState } from "react";
import { handelSignInActions } from "@/actions/SignInActinon";
import { Button } from "@/components/ui/button";
import { checkEmptyField } from "@/lib/utils";
import { useRouter } from "next/navigation";


export default function SignIn() {

  const router = useRouter()
  const [errMessage, seterrMessage] = useState("")
  const [isloading, setIsloading] = useState(false)



  const handelSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formdata.entries());

    const err = checkEmptyField(data);

    if (err) {
      seterrMessage(err);
      return
    }

    const { password, confirm_Password } = data;

    if (password != confirm_Password) {
      seterrMessage("please enter same password");
      return;
    }

    if (!!errMessage) {
      return
    }

    setIsloading(true)

    try {
      const actionResponse = await handelSignInActions(formdata)
      router.replace("/")
    } catch (error) {
      seterrMessage((error as Error).message)
    }
    finally {
      setIsloading(false)
    }

  }

  return (
    <div className="mainContainer w-full flex flex-row h-full"
      style={{
        backgroundImage: "url(/resister.jpg)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative backdrop-blur-sm w-full h-full flex p-8 text-white">
        <div className="w-full h-full shadow-lg flex rounded-md overflow-hidden" >
          <div className="form w-1/3 flex flex-col items-center pt-10 bg-[#7ab96c]">

            {/* <div className="welcome">
              <Image alt="reload" width={150} height={150} src={"/loginLogo.png"} />
            </div> */}

            <form
              onSubmit={handelSignIn}
              className="flex flex-col justify-center items-center space-y-2 "
            >
              <label className="flex flex-col space-y-1">
                Name
                <input name="name" type="text" className="w-60 h-8 rounded-sm text-black px-2 " />
              </label>
              <label className="flex flex-col space-y-1">
                Phone Number
                <input name="phoneNumber" type="text" className="w-60 h-8 rounded-sm text-black px-2 " />
              </label>
              <label className="flex flex-col space-y-1">
                Email
                <input name="email" type="email" className="w-60 h-8 rounded-sm text-black px-2 " />
              </label>
              <label className="flex flex-col space-y-1">
                Address
                <input name="address" type="text" className="w-60 h-8 rounded-sm text-black px-2 " />
              </label>

              <label className="flex flex-col space-y-1">
                Password
                <input name="password" type="password" className="w-60 h-8 rounded-sm text-black px-2" />
              </label>

              <label className="flex flex-col space-y-1">
                confirm Password
                <input name="confirm_Password" type="text" className="w-60 h-8 rounded-sm text-black px-2" />
              </label>


              <div className="w-full py-6">

                <Button disabled={isloading} >
                  {
                    isloading ? "loading..." : "Resister"
                  }
                </Button>
              </div>



            </form>

            {
              errMessage &&
              <h1 className="text-red-500 text-base font-bold">{errMessage}</h1>
            }

            <div className="flex flex-row ">
              <h1> already have a Account?</h1>
              <Link href={"/login"} className="underline">Login</Link>
            </div>

          </div>



          {/* <div className="form w-1/3 flex flex-col items-center justify-center bg-slate-600">
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
      </div> */}

          <div className="photo_container  w-2/3 bg-orange-300 h-full"
            style={{
              backgroundImage: "url(/resister.jpg)",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: "50% 43%",
            }}>

          </div>

        </div>
      </div>

    </div>
  )
}

