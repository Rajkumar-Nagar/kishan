"use client"

import { getDataFromId } from "@/actions/productId.actio"
import FileUploader from "@/components/fileUploader"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { CldImage } from "next-cloudinary"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


function ProfileEdit() {
    const [user, setuser] = useState<User | null>(null)

    const { data } = useSession()
    const userID = data?.user.id


    useEffect(() => {
        if (!userID) return
        getDataFromId(userID, "user")
            .then((user) => {
                setuser(user)
                if (user) {
                    setname(user.name)
                    setavatar(user.avatar)
                    setemail(user.email)
                    setcurrentAddress(user.address)
                    setphoneNumber(user.phoneNumber)
                }
            })
    }, [userID])


    const router = useRouter()

    const [avatar, setavatar] = useState("")

    const [profileError, setprofileError] = useState("")
    const [profileLoading, setprofileLoading] = useState(false)

    const [name, setname] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [email, setemail] = useState("")
    const [currentAddress, setcurrentAddress] = useState("")


    const handelPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) return;
        setphoneNumber(value)
    }


    const handelUpdatedProfile = async () => {
        if (!userID) return
        if (!name || !phoneNumber || !currentAddress) {
            setprofileError("please fill name,phoneNumber,and address")
            return
        }
        if (!avatar) {
            setprofileError("please select profile image")
            return
        }

        try {
            setprofileLoading(true)
            const response = await fetch("/api/updateProfile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        name,
                        phoneNumber,
                        email,
                        address: currentAddress,
                        avatar,
                        _id: userID
                    }
                )
            })
            if (!response.ok) {
                throw new Error("profile updated unsussefullly")
            }

            const updateduser = response.json()
            setprofileLoading(false)
            router.refresh()

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setprofileLoading(false)
        }
    }


    if (!user) return <h1>loading...</h1>

    return (
        <>
            <h1 className='text-xl font-semibold text-[#002f34] p-2 '>Edit Profile</h1>
            <div className="editdetails rounded-md border-2 shadow-lg py-10">
                <div className="prodfilePhotochage flex items-center  h-full justify-center relative">
                    {
                        avatar ?
                            <CldImage
                                alt="Uploaded Image"
                                src={avatar}
                                width={"170"}
                                height={"170"}
                                className='w-32 h-32 rounded-full'
                                crop={{
                                    type: 'auto',
                                    source: true
                                }}
                            /> : (
                                <div className="profile w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center">
                                    <h1 className="text-[#002f34] text-xl font-semibold">{user?.name.slice(0, 1)}</h1>
                                </div>
                            )
                    }

                    <button className="editbutton bg-gray-300 rounded-full p-2 absolute -bottom-5 ">
                        <FileUploader onUpload={img => setavatar(img)} onDelete={() => setavatar("")} preview={false} />
                    </button>
                </div>

                <div className="editcontent flex flex-col gap-3 mt-12">
                    <label htmlFor="name" className='flex flex-col w-[70%] m-auto text-[#002f34] text-base font-semibold'>
                        Name
                        <input type="text" id='name' value={name} onChange={(e) => setname(e.target.value)} className='  h-11 rounded-md px-3 border-2 text-[#002f34] text-base border-gray-400 py-2 focus:outline-none focus:border-2 focus:border-blue-300' />
                    </label>
                    <label htmlFor="Phone_Number" className='flex flex-col w-[70%] m-auto text-[#002f34] text-base font-semibold'>
                        Phone Number
                        <input type="text" value={phoneNumber} onChange={handelPhoneNumber} id='Phone_Number' className='  h-11 rounded-md px-3 border-2 text-[#002f34] text-base border-gray-400 py-2 focus:outline-none focus:border-2 focus:border-blue-300' />
                    </label>
                    <label htmlFor="email" className='flex flex-col w-[70%] m-auto text-[#002f34] text-base font-semibold'>
                        email
                        <input type="email" id='email' value={email} onChange={(e) => { setemail(e.target.value) }} className='  h-11 rounded-md px-3 border-2 text-[#002f34] text-base border-gray-400 py-2 focus:outline-none focus:border-2 focus:border-blue-300' />
                    </label>
                    <label htmlFor="Current_Address" className='flex flex-col w-[70%] m-auto text-[#002f34] text-base font-semibold'>
                        Current Address
                        <input type="text" id='Current_Address' value={currentAddress} onChange={(e) => { setcurrentAddress(e.target.value) }} className='  h-11 rounded-md px-3 border-2 text-[#002f34] text-base border-gray-400 py-2 focus:outline-none focus:border-2 focus:border-blue-300' />
                    </label>

                    {
                        profileError &&
                        <h1 className='text-red-600 mt-2 text-center text-base font-semibold'>{profileError}</h1>
                    }

                </div>


                <div className="canclebutton flex justify-between w-[70%] m-auto my-6 px-6">
                    <button onClick={() => { router.replace("/") }} className='text-base font-semibold w-32 items-center justify-center border-[1px] hover:border-[#09f] h-11 my-1 rounded-md hover:bg-[#f0f8ff] hover:text-[#09f]'>
                        Cancel
                    </button>
                    <Button onClick={handelUpdatedProfile} className="cancle bg w-32 rounded-md h-11 flex items-center justify-center">
                        {profileLoading ? "Loading..." : "Submit"}
                    </Button>
                </div>


            </div>

        </>
    )
}



export default ProfileEdit;