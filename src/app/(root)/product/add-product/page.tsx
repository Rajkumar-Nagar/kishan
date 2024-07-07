"use client"

import { auth } from '@/auth';
import FileUploader from '@/components/fileUploader';
import Dropdown from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/button';
import { IStatesWithDistricts, statesWithDistricts, crops, Icrops } from '@/data';
import { METHODS } from 'http';
import { Corben } from 'next/font/google';
import Image from 'next/image';
import React, { useState } from 'react'

import party from "party-js";
import Link from 'next/link';


const Quantity = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
    "2000",
    "3000",
    "5000",
    "10000"
]


function Page() {

    const [product, setproduct] = useState(null)
    const [conformation, setConformation] = useState(false)
    const [error, seterror] = useState("")
    const [isloading, setisloading] = useState(false)


    const [aadhar_number, setAadhar_number] = useState("")
    const [current_location, setCurrent_location] = useState("")
    const [additional_number, setAdditional_number] = useState("")
    const [aadharphotos, setAadharphotos] = useState([])


    const [selectProduct, setselectProduct] = useState("")
    const [quantity, setquantity] = useState("")
    const [varity, setVarity] = useState("")
    const [expectedPrize, setExpectedPrize] = useState("")
    const [units, setUnits] = useState("kg")
    const [mandiOption, setmandiOption] = useState("")


    const [uploadImages, setUploadImages] = useState([])
    const [uploadVideos, setUploadVideos] = useState([])

    const [city, setCity] = useState("")
    const [village, setVillage] = useState("")
    const [pincode, setpincode] = useState("")
    const [state, setstate] = useState<IStatesWithDistricts>("Rajasthan")
    const [distict, setdistict] = useState("")


    const [grading, setgrading] = useState("false")
    const [Color, setColor] = useState("")
    const [GrainSize, setGrainSize] = useState("")
    const [Moisturecontent, setMoisturecontent] = useState("")

    const [harvestDate, setHarvestDate] = useState("")
    const [harvestLocation, setHarvestLocation] = useState("")

    const [liveStreaming, setLiveStreaming] = useState(false)
    const [setsampleRequest, setSetsampleRequest] = useState(false)

    console.log(selectProduct)


    const handleAadharNumber = (e) => {
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

    const handelMobilNumber = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove existing spaces
        if (value.length > 10) return; // Limit to 12 digits
        setAdditional_number(value)
    }


    const hadleItemAdd = async () => {

        if (!aadhar_number || !current_location || !aadharphotos || !selectProduct || !quantity || !varity || !expectedPrize || !units || !mandiOption || !uploadImages || !city || !village || !pincode || !distict || !state || !Color || !harvestDate || !harvestLocation || !uploadImages || !liveStreaming || !setsampleRequest) {
            seterror("please fill all required field (*)")
            return;
        }
        if (aadharphotos.length != 2) {
            seterror("please upload  aadhar  front and back both photos ")
            return;
        }
        if (uploadImages.length < 5) {
            seterror("please take min five photos of your crops with different angle")
            return;
        }

        if (!(setsampleRequest && liveStreaming)) {
            seterror("Please accept both the additonal service without this you can not move forword")
            return;
        }
        try {

            setisloading(true)
            const response = await fetch("http://localhost:3000/api/addproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    aadhar_number,
                    current_location,
                    additional_number,
                    aadharphotos,

                    cropName: selectProduct,
                    variety: varity,
                    quantityAvailable: quantity,
                    units: units,
                    expectedPrice: expectedPrize,

                    city: city,
                    village: village,
                    pincode: pincode,
                    districtCity: distict,
                    state: state,

                    moistureContent: Moisturecontent,
                    grainSize: GrainSize,
                    color: Color,
                    purity: grading,

                    harvestDate: harvestDate,
                    storageLocation: harvestLocation,

                    photos: uploadImages,
                    videos: [],

                    sampleRequest: true,
                    liveStreaming: true
                })
            });

            if (!response.ok) {
                throw new Error("internal server Errror")
            }
            const data = await response.json()
            setisloading(false)
            setproduct(data)
            setConformation(true)
            console.log(data)

        } catch (error) {
            console.log("product is not add ", { error })
        }
    }



    return (

        <>

            {
                conformation ? (
                    <div className="addedconfirmation w-full h-full"
                        style={{
                            backgroundImage: "url(/welcome.jpg)",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    >

                        <div className=" backdrop-blur-sm flex justify-center items-center w-full h-full  p-8">

                            <div className="imagebox w-[80%] overflow-hidden rounded-md h-[80%] bg-white flex items-center">
                                <div className="photo_container  w-1/2  h-full"
                                    style={{
                                        backgroundImage: "url(/welcome.jpg)",
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        // backgroundPosition: '',
                                    }}>

                                </div>

                                <div className=' flex flex-col space-y-3 items-center px-6'>

                                    <div className='flex items-center gap-4'>
                                        <Image alt="reload" width={150} height={150} src={"/party.png"} />
                                        <h1 className='text-green-500 font-semibold text-3xl'> Congratulations!</h1>
                                    </div>

                                    <h1 className=' text-[#002f34] text-xl'>
                                        Your crop has been successfully added to our platform.
                                    </h1>

                                    <p className=' text-[#002f34] text-xs'>
                                        Thank you for your contribution. Together, let's make farming more efficient and profitable!"
                                    </p>

                                    <Link href={"/"} className=' text-[#002f34] text-base underline ' >
                                        Go Home
                                    </Link>

                                    <Button variant={"Login"} onClick={()=>{setConformation(false)}}>
                                        Add Another product
                                    </Button>

                                </div>

                            </div>
                        </div>

                    </div>
                ) : (

                    <div className="maincontainer flex  justify-center w-full ">
                        <div className="frombox w-[70%] rounded-3xl border-2 shadow-lg overflow-hidden my-4">
                            <div className="header h-32 w-full flex flex-row "
                                style={{
                                    backgroundImage: "url(/natural.jpg)",
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className=" w-full h-full flex p-8 text-white">

                                </div>

                            </div>

                            <div className="titlek w-full border-b-[1px]">
                                <h1 className="tagline text-center text-[#002f34] font-semibold text-3xl my-3">Add Product Deatils</h1>
                            </div>


                            <div className="personal_information px-14 py-10 border-b-[1px]">
                                <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Personal Information</h1>

                                <div className=" personal_informationfield mt-4 px-5 space-y-2">
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

                                    <div className="location_additional_number flex items-center justify-between">

                                        <div className="location w-[48%]">

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

                                        <div className="additional_number w-[48%]">

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


                                    <div className="aadharphotos flex items-center justify-evenly">
                                        <div className="fortPhotos">

                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Aadhar Front Photo</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>

                                            <FileUploader setUploadImages={setAadharphotos} _id={"fornt"} />

                                        </div>

                                        <div className="backphotos">

                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Aadhar back Photo</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>

                                            <FileUploader setUploadImages={setAadharphotos} _id={"back"} />

                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="basicInformation px-14 py-10 border-b-[1px]">
                                <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Crop Information</h1>

                                <div className="basicInformationField mt-4 px-5 space-y-2">

                                    <div className="cropName">
                                        <div className='flex items-center'>
                                            <h1 className=" text-[#002f34] text-xl my-2">Crop Name</h1>
                                            <span className=" text-[#da4f43] text-xl my-2">*</span>
                                        </div>

                                        <Dropdown
                                            Setquantity={(v: string) => setselectProduct(v as Icrops)}
                                            quntity={selectProduct}
                                            fields={Object.keys(crops)}
                                            nameDrop="Product" />
                                    </div>

                                    <div className="varity_quantity flex justify-between items-center">
                                        <div className="varity w-[48%]">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Varity</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <Dropdown
                                                Setquantity={setVarity}
                                                quntity={varity}
                                                fields={crops[selectProduct]}
                                                nameDrop="varity" />
                                        </div>

                                        <div className="quantity w-[48%] ">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Availble Quantity</h1>
                                                <h1 className=" text-[#65d73b] text-xl my-2">(Kg)</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>

                                            <Dropdown
                                                Setquantity={setquantity}
                                                quntity={quantity}
                                                fields={Quantity}
                                                nameDrop="Quantity" />
                                        </div>

                                    </div>


                                    <div className="Expected_prize_SellingOption flex items-center justify-between">
                                        <div className="expectedPrize w-[48%] flex items-center justify-between gap-6">
                                            <div className="prize w-[60%]">
                                                <div className='flex items-center'>
                                                    <h1 className=" text-[#002f34] text-xl my-2">Expected Prize</h1>
                                                    <h1 className=" text-[#65d73b] text-xl my-2">(₹)</h1>
                                                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                                                </div>
                                                <div className='relative'>
                                                    <input
                                                        type="text"
                                                        className='Pinput w-full'
                                                        value={expectedPrize}
                                                        onChange={(e) => {
                                                            setExpectedPrize(e.target.value.replace(/\D/g, ''))
                                                        }} />
                                                </div>
                                            </div>
                                            <div className="units w-[40%]">
                                                <div className='flex items-center'>
                                                    <h1 className=" text-[#002f34] text-xl my-2">Unit</h1>
                                                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                                                </div>
                                                <Dropdown
                                                    Setquantity={setUnits}
                                                    quntity={units}
                                                    fields={["gm", "kg", "ton", "Quintal"]}
                                                    nameDrop="unit" />
                                            </div>
                                        </div>

                                        <div className="sellingoption w-[48%]">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Selling Option</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <Dropdown
                                                Setquantity={setmandiOption}
                                                quntity={mandiOption}
                                                fields={["Online All india Mandi", "Online Mini Mandi", "Direct to Vendor"]}
                                                nameDrop="Option" />
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="LocationInformatin px-14 py-10 border-b-[1px]">
                                <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Location Details</h1>

                                <div className="Distict_state mt-4 px-5 space-y-2">

                                    <div className=" flex items-center justify-between">

                                        <div className="sellingoption w-[48%]">
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

                                        <div className="sellingoption w-[48%]">
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

                                <div className="farmLocatin mt-4 px-5 space-y-2">

                                    <div className="city_pincode_village flex items-center justify-between">

                                        <div className="city w-[32%]">
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
                                        <div className="village w-[32%]">
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
                                        <div className="city w-[32%]">
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

                            <div className="QualityParameter px-14 py-10 border-b-[1px]">

                                <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Qulity Parameter</h1>

                                <div className="basicInformationField mt-4 px-5 space-y-2">

                                    <div className="color_grading  flex justify-between items-center">

                                        <div className="color w-[48%]">
                                            <h1 className=" text-[#002f34] text-xl my-2">Color</h1>
                                            <input
                                                type="text"
                                                className='Pinput w-full'
                                                value={Color}
                                                onChange={(e) => { setColor(e.target.value) }} />
                                        </div>

                                        <div className="grading w-[48%] ">

                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Grading of Crops</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>

                                            <Dropdown
                                                Setquantity={setgrading}
                                                quntity={grading}
                                                fields={["Yes Grading is complete", "No Grading is not complete"]}
                                                nameDrop="Grading" />
                                        </div>
                                    </div>

                                    <div className="GrainSize_Moisturecontent  flex justify-between items-center">

                                        <div className=" GrainSize color w-[48%]">
                                            <h1 className=" text-[#002f34] text-xl my-2">Grain Size</h1>
                                            <input
                                                type="text"
                                                className='Pinput w-full'
                                                value={GrainSize}
                                                onChange={(e) => { setGrainSize(e.target.value) }} />
                                        </div>

                                        <div className="Moisturecontent w-[48%] ">
                                            <h1 className=" text-[#002f34] text-xl my-2">Moisture content</h1>
                                            <input
                                                type="text"
                                                className='Pinput w-full'
                                                value={Moisturecontent}
                                                onChange={(e) => { setMoisturecontent(e.target.value) }} />
                                        </div>
                                    </div>

                                </div>

                            </div>



                            <div className="harvest_storage px-14 py-10 border-b-[1px]">

                                <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Harvest & Storage</h1>

                                <div className="harvest_storagefield mt-4 px-5 space-y-2 ">

                                    <div className="harvest_storage flex justify-between">
                                        <div className=" harvest color w-[48%]">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Harvest Date</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <input
                                                type="date"
                                                className='Pinput w-full'
                                                value={harvestDate}
                                                onChange={(e) => { setHarvestDate(e.target.value) }} />
                                        </div>

                                        <div className=" sotorage color w-[48%]">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Storage Location</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <input
                                                type="text"
                                                className='Pinput w-full'
                                                value={harvestLocation}
                                                onChange={(e) => { setHarvestLocation(e.target.value) }} />
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="media px-14 py-10 border-b-[1px]">

                                <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Video & Photos</h1>

                                <div className="mediafield mt-4 px-5 space-y-2 ">

                                    <div className='flex flex-col space-y-4'>
                                        <div className="photos">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Photos</h1>
                                                <h1 className=" text-[#65d73b] text-xl my-2">(Min five photos)</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <div className="photobox flex flex-wrap gap-4">

                                                <FileUploader setUploadImages={setUploadImages} _id={"image1"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image2"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image3"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image4"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image5"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image6"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image7"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image8"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image9"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image10"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image11"} />
                                                <FileUploader setUploadImages={setUploadImages} _id={"image12"} />


                                            </div>
                                        </div>


                                        <div className="videos">
                                            <div className='flex items-center'>
                                                <h1 className=" text-[#002f34] text-xl my-2">Videos</h1>
                                                <h1 className=" text-[#65d73b] text-xl my-2">(Min one video)</h1>
                                                <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            </div>
                                            <div className="video flex flex-wrap gap-4">
                                                <FileUploader setUploadVideos={setUploadVideos} videoFile _id={"video1"} />
                                                <FileUploader setUploadVideos={setUploadVideos} videoFile _id={"video2"} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="AdditionalService px-14 py-10 border-b-[1px] ">

                                <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Additional Service</h1>
                                <div className="AdditionalServicefield mt-4 px-5 space-y-2 ">

                                    <div className="additional_service flex flex-col gap-2">

                                        <div className="liveStreaming flex items-center gap-2">
                                            <input type="checkbox" name="liveStraming" onChange={() => { setLiveStreaming(!liveStreaming) }} checked={liveStreaming} id="liveStreaming" className='w-6 h-6' />
                                            <label htmlFor='liveStreaming' className=" text-[#002f34] text-xl my-2">Live Streaming</label>
                                            <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            <span className=" text-[green] text-xl underline my-2">About</span>
                                        </div>

                                        <div className="liveStreaming flex items-center gap-2">
                                            <input type="checkbox" name="sampleRequest" id="sampleRequest" onChange={() => { setSetsampleRequest(!setsampleRequest) }} checked={setsampleRequest} className='w-6 h-6' />
                                            <label htmlFor='sampleRequest' className=" text-[#002f34] text-xl my-2">Sample Request</label>
                                            <span className=" text-[#da4f43] text-xl my-2">*</span>
                                            <span className=" text-[green] text-xl underline my-2">About</span>
                                        </div>

                                    </div>

                                </div>

                                {
                                    error &&
                                    <h1 className='text-red-600 text-xl font-semibold'>{error}</h1>
                                }

                                <Button onClick={hadleItemAdd} disabled={isloading} variant={"Login"} className='my-9' >
                                    {isloading ? "...loading" : "Add Crop"}
                                </Button>
                            </div>
                        </div>
                    </div >
                )
            }

        </>


    )

}

export default Page

