"use client"

import Link from "next/link";
import { useState } from "react";
import { authActions } from "@/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { signUpSchema } from "@/lib/zod.schema";
import { z } from "zod";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, formState: { errors }, setError, ...form } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      password: "",
      confirm_Password: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsloading(true);
    setErrorMsg("");
    try {
      await authActions.signUp(data);
      signIn('credentials', {
        redirect: false,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
      router.replace("/");
    } catch (error: any) {
      setErrorMsg("Something went wrong");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div
      className="mainContainer w-full flex flex-row h-full"
      style={{
        backgroundImage: "url(/resister.jpg)",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative backdrop-blur-sm w-full h-full flex md:p-8 p-6 text-white">
        <div className="w-full h-full flex flex-col md:flex-row shadow-lg rounded-md overflow-hidden">
          <div className="form md:w-1/3 md:min-w-64 w-full order-2 md:order-1 pt-7 flex flex-col items-center h-full md:justify-center bg-[#7ab96c]">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full px-10 md:w-80 lg:w-96 lg:min-w-60 space-y-2">
              <label className="flex flex-col w-full space-y-1">
                Name
                <input {...register("name")} type="text" className="h-8 w-full rounded-sm text-black px-2" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </label>

              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <label className="flex flex-col w-full space-y-1">
                    Phone Number
                    <input
                      {...field}
                      maxLength={10}
                      type="text"
                      className="h-8 rounded-sm text-black px-2 w-full"
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length > 10) return;
                        field.onChange(value)
                      }}
                    />
                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                  </label>
                )}
              />

              <label className="flex flex-col w-full space-y-1">
                Email (optional)
                <input {...register("email")} type="email" className="h-8 w-full rounded-sm text-black px-2" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </label>

              <label className="flex flex-col w-full space-y-1">
                Address
                <input {...register("address")} type="text" className="h-8 w-full rounded-sm text-black px-2" />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
              </label>

              <label className="flex flex-col w-full space-y-1 relative">
                Password
                <input {...register("password")} type={showPassword ? "text" : "password"} autoComplete="password" className="h-8 w-full rounded-sm text-black px-2" />
                <button type="button" className="absolute right-3 top-1/2" onClick={() => setShowPassword(!showPassword)}>
                  <Image width={20} height={20} alt="reload" src={showPassword ? "/eye.png" : "/view.png"} />
                </button>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </label>

              <label className="flex flex-col w-full space-y-1 relative">
                Confirm Password
                <input {...register("confirm_Password")} type={showPassword2 ? "text" : "password"} autoComplete="password" className="h-8 w-full rounded-sm text-black px-2" />
                <button type="button" className="absolute right-3 top-1/2" onClick={() => setShowPassword2(!showPassword2)}>
                  <Image width={20} height={20} alt="reload" src={showPassword2 ? "/eye.png" : "/view.png"} />
                </button>
                {errors.confirm_Password && <p className="text-red-500">{errors.confirm_Password.message}</p>}
              </label>

              <div className="w-full py-3">
                <Button disabled={isloading} type="submit" variant="Login">
                  {isloading ? "Loading..." : "Register"}
                </Button>
              </div>
            </form>

            {errorMsg && <p className="text-red-500">{errorMsg}</p>}

            <div className="flex flex-row">
              <h1>Already have an Account?&nbsp;</h1>
              <Link href="/login" className="underline">Login</Link>
            </div>
          </div>

          <div className="photo_container md:w-2/3 order-1 h-[50%] bg-center sm:bg-top md:order-2 w-full bg-orange-300 md:h-full"
            style={{
              backgroundImage: "url(/resister.jpg)",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
