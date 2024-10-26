"use client"
import FileUploader from '@/components/fileUploader';
import Successfull from '@/components/Successfull';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/Dropdown';
import { Income, IStatesWithDistricts, Profession, statesWithDistricts } from '@/data';
import React, { useState } from 'react'

export default function Licence() {

    const [confirmation, setconfirmation] = useState(false)
    const [error, seterror] = useState("")
    const [isloading, setisloading] = useState(false);

    const [mandiType, setmandiType] = useState("")
    const [minimandiState, setminimandiState] = useState("")
    const [minimandidistict, setminimandidistict] = useState("")


    const [aadhar_number, setAadhar_number] = useState("")
    const [additional_number, setAdditional_number] = useState("")
    const [aadharphotos, setAadharphotos] = useState<string[]>([])
    const [current_location, setCurrent_location] = useState("")

    const [city, setCity] = useState("")
    const [village, setVillage] = useState("")
    const [pincode, setpincode] = useState("")
    const [state, setstate] = useState<IStatesWithDistricts>("Rajasthan")
    const [distict, setdistict] = useState("")


    const [work, setWork] = useState("")
    const [income, setincome] = useState("")
    const [storagefield, setstoragefield] = useState("")
    const [storageLocation, setStorageLocation] = useState("")
    const [storagelocaitonMedia, setstoragelocaitonMedia] = useState<string[]>([])


    const [diclaration, setDiclaration] = useState(false);
    const [tems_condition, settems_condition] = useState(false)

    const handleAadharNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove existing spaces
        if (value.length > 12) return; // Limit to 12 digits

        // Add spaces after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        setAadhar_number(formattedValue);
    }

    const handelMobilNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove existing spaces
        if (value.length > 10) return; // Limit to 12 digits
        setAdditional_number(value)
    }

    const hadleItemAdd = async () => {

        if (!mandiType || !aadhar_number || !aadharphotos || !current_location || !city || !village || !pincode || !state || !distict || !work || !income || !storagefield || !storageLocation || !storagelocaitonMedia || !diclaration || !tems_condition) {
            seterror("please fill all required filed (*)")
            return
        }

        if (mandiType == "Mini Mandi") {
            if (!minimandiState || !minimandidistict) {
                seterror("please select minimandis state and distict ")
                return
            }
        }

        if (aadharphotos.length < 3) {
            seterror("please upload aadhar card fort,back and a passport size clear photo")
            return
        }

        if (storagelocaitonMedia.length < 3) {
            seterror("please upload min 3 picture of storage location")
            return
        }

        if (!(diclaration && tems_condition)) {
            seterror("diclaration and tems and condition required(*)")
            return
        }
        try {
            console.log({
                mandiType,
                mandiState: minimandiState,
                madiDistict: minimandidistict,
                aadhar_number: aadhar_number,
                aadharphotos: aadharphotos,
                additional_number: additional_number,
                current_location: current_location,
                state,
                distict,
                village,
                city,
                pincode,
                work,
                income,
                storagePlace: storagefield,
                storageLocation: storageLocation,
                storageImages: storagelocaitonMedia,
                diclaration,
                terms_condition: tems_condition
            })
            setisloading(true)
            const response = await fetch("/api/getLicence", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mandiType,
                    mandiState: minimandiState,
                    madiDistict: minimandidistict,
                    aadhar_number: aadhar_number,
                    aadharphotos: aadharphotos,
                    additional_number: additional_number,
                    current_location: current_location,
                    state,
                    distict,
                    village,
                    city,
                    pincode,
                    work,
                    income,
                    storagePlace: storagefield,
                    storageLocation: storageLocation,
                    storageImages: storagelocaitonMedia,
                    diclaration,
                    terms_condition: tems_condition
                })
            })

            if (!response.ok) {
                console.log(await response.json())
                throw new Error("license applied failed")
            }

            const data = await response.json()
            setisloading(false)
            setconfirmation(true)

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setisloading(false)
        }
    }

    const handleAadharImage = {
        Add: (image: string) => {
            setAadharphotos(prev => [...prev, image])
        },
        Delete: (image: string) => {
            setAadharphotos(prev => prev.filter((item) => item !== image))
        }
    }

    const handleStorageLocaitonMedia = {
        Add: (image: string) => {
            setstoragelocaitonMedia(prev => [...prev, image])
        },
        Delete: (image: string) => {
            setstoragelocaitonMedia(prev => prev.filter((item) => item !== image))
        }
    }

    // if (confirmation) {
    //     return (
    //         <Successfull product setConformation={setconfirmation} title={"Your license application has been successfully submit to our platform. please wait for our response"} imgurl="/welcome.jpg" />
    //     )
    // }

    return (
        <div className="container max-w-4xl w-full p-2 sm:p-4 md:p-8">
            <div className="frombox rounded-3xl border-2 shadow-lg overflow-hidden my-4">
                <div className="header h-60 w-full flex flex-row "
                    style={{
                        backgroundImage: "url(/license.jpg)",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 25%',
                    }}
                >
                    <div className=" w-full h-full flex p-8 text-white">

                    </div>

                </div>


                <div className="space-y-10 divide-y [&>div_>_h1]:mt-10 [&>div]:px-4 sm:[&>div]:px-8 md:[&>div]:px-10 [&>div]:space-y-4">
                    <div className="title w-full">
                        <h1 className="tagline text-center text-[#002f34] font-semibold text-3xl my-3">Apply For License of Mandi</h1>
                    </div>

                    <div className="personal_information">
                        <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Select Mandi</h1>

                        <div className=" personal_informationfield space-y-2">
                            <Dropdown
                                Setquantity={setmandiType}
                                quntity={mandiType}
                                fields={["All India Mandi", "Mini Mandi"]}
                                nameDrop="Mandi" />

                            {
                                mandiType == "Mini Mandi" && (
                                    <div className=" flex items-center justify-between flex-wrap *:basis-52 [&>div]:grow gap-4">

                                        <div className="sellingoption">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">State</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <Dropdown
                                                Setquantity={(v: string) => setminimandiState(v as IStatesWithDistricts)}
                                                quntity={minimandiState}
                                                fields={Object.keys(statesWithDistricts)}
                                                nameDrop="state" />
                                        </div>

                                        <div className="sellingoption">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Distict</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <Dropdown
                                                Setquantity={setminimandidistict}
                                                quntity={minimandidistict}
                                                fields={statesWithDistricts[state]}
                                                nameDrop="distict" />
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </div>

                    <div className="personal_information">
                        <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Personal Information</h1>

                        <div className="personal_informationfield space-y-2">

                            <div className="aadhar_number">

                                <div className='flex items-center'>
                                    <h1 className=" text-[#002f34] text-xl my-2">Aadhar Number</h1>
                                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                                </div>

                                <input
                                    type="text"
                                    className='Pinput w-full'
                                    value={aadhar_number}
                                    onChange={handleAadharNumber}
                                    maxLength={14} />
                            </div>

                            <div className="location_additional_number flex items-center flex-wrap *:basis-52 [&>div]:grow gap-4">
                                <div className="location">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Current Location</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>

                                    <input
                                        type="text"
                                        className='Pinput w-full'
                                        value={current_location}
                                        onChange={(e) => { setCurrent_location(e.target.value) }} />
                                </div>

                                <div className="additional_number">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">other Number</h1>
                                        {/* <span className=" text-[#da4f43] text-xl my-2">*</span> */}
                                    </div>

                                    <input
                                        type="text"
                                        className='Pinput w-full'
                                        value={additional_number}
                                        onChange={handelMobilNumber} />
                                </div>

                            </div>


                            <div className="aadharphotos flex items-center justify-evenly flex-wrap gap-4 [&>div_div:nth-child(2)]:mx-auto">
                                <div className="fortPhotos">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Aadhar Front Photo</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>

                                    <FileUploader onUpload={handleAadharImage.Add} onDelete={handleAadharImage.Delete} preview />
                                </div>

                                <div className="backphotos">

                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Aadhar back Photo</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>

                                    <FileUploader onUpload={handleAadharImage.Add} onDelete={handleAadharImage.Delete} />

                                </div>

                                <div className="passportsizePhoto">

                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Passport size Photo</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>

                                    <FileUploader onUpload={handleAadharImage.Add} onDelete={handleAadharImage.Delete} />

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="LocationInformatin space-y-4">
                        <h1 className="tagline text-[#002f34] font-semibold text-2xl">Location Details</h1>

                        <div className="Distict_state space-y-2">

                            <div className="flex items-center flex-wrap gap-4">

                                <div className="sellingoption grow">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">State</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <Dropdown
                                        Setquantity={(v: string) => setstate(v as IStatesWithDistricts)}
                                        quntity={state}
                                        fields={Object.keys(statesWithDistricts)}
                                        nameDrop="Option" />
                                </div>

                                <div className="sellingoption grow">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">distict</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <Dropdown
                                        Setquantity={setdistict}
                                        quntity={distict}
                                        fields={statesWithDistricts[state]}
                                        nameDrop="Option" />
                                </div>
                            </div>
                        </div>

                        <div className="farmLocatin space-y-2">

                            <div className="city_pincode_village flex items-center flex-wrap gap-4 [&>div]:basis-44 [&>div]:grow">
                                <div className="city">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">city</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className='Pinput w-full'
                                        value={city}
                                        onChange={(e) => { setCity(e.target.value) }} />
                                </div>
                                <div className="village">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Village</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className='Pinput w-full'
                                        value={village}
                                        onChange={(e) => { setVillage(e.target.value) }} />
                                </div>
                                <div className="city">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">pin code</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className='Pinput w-full'
                                        value={pincode}
                                        onChange={(e) => { setpincode(e.target.value) }} />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="professional_field">
                        <h1 className="tagline text-[#002f34] font-semibold text-2xl ">Profissional Information</h1>

                        <div className="loationfild space-y-2">

                            <div className="work_and_Income flex items-center flex-wrap [&>div]:grow gap-4">
                                <div className="sellingoption">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Work</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <Dropdown
                                        Setquantity={setWork}
                                        quntity={work}
                                        fields={Profession}
                                        nameDrop="Option" />
                                </div>

                                <div className="sellingoption">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Income</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <Dropdown
                                        Setquantity={setincome}
                                        quntity={income}
                                        fields={Income}
                                        nameDrop="Option" />
                                </div>
                            </div>

                            <div className="storagefield flex items-center flex-wrap [&>div]:grow [&>div]:basis-48 gap-4">
                                <div className="village">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Storage Place</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className='Pinput w-full'
                                        value={storagefield}
                                        onChange={(e) => { setstoragefield(e.target.value) }} />
                                </div>
                                <div className="city">
                                    <div className='flex items-center'>
                                        <h1 className=" text-[#002f34] text-xl my-2">Storage Location</h1>
                                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className='Pinput w-full'
                                        value={storageLocation}
                                        onChange={(e) => { setStorageLocation(e.target.value) }} />
                                </div>

                            </div>

                            <div className="locationMedia">
                                <div className='flex items-center'>
                                    <h1 className=" text-[#002f34] text-xl my-2">Storage Palace Images (minimun 3)</h1>
                                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                                </div>

                                <div className="images flex flex-wrap gap-4">
                                    {
                                        new Array(3).fill(0).map((_, index) => (
                                            <FileUploader key={index} onUpload={handleStorageLocaitonMedia.Add} onDelete={handleStorageLocaitonMedia.Delete} />
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="professional_field pb-5 sm:pb-10">
                        <h1 className="tagline text-[#002f34] font-semibold text-2xl"> Agreements and Declarations</h1>

                        <div className="loationfild space-y-2">


                            <div className="additional_service flex flex-col gap-2">

                                <div className="liveStreaming flex items-center gap-2">
                                    <input type="checkbox" name="diclaration" onChange={() => { setDiclaration(!diclaration) }} checked={diclaration} id="diclaration" className='w-6 h-6' />
                                    <label htmlFor='diclaration' className=" text-[#002f34] text-xl my-2">Declaration of Accuracy</label>
                                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    <span className=" text-[green] text-xl underline my-2">About</span>
                                </div>

                                <div className="liveStreaming flex items-center gap-2">
                                    <input type="checkbox" name="tems_condition" id="tems_condition" onChange={() => { settems_condition(!tems_condition) }} checked={tems_condition} className='w-6 h-6' />
                                    <label htmlFor='tems_condition' className=" text-[#002f34] text-xl my-2">Terms and Conditions</label>
                                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                                    <span className=" text-[green] text-xl underline my-2">About</span>
                                </div>

                            </div>

                        </div>


                        {
                            error &&
                            <h1 className='text-red-600 text-xl font-semibold mt-4'>{error}</h1>
                        }

                        <Button onClick={hadleItemAdd} disabled={isloading} variant={"Login"} className='my-9' >
                            {isloading ? "Loading..." : "Apply"}
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

