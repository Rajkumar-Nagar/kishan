"use client"
import FileUploader from '@/components/fileUploader';
import Successfull from '@/components/Successfull';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/Dropdown';
import { Income, IStatesWithDistricts, Profession, statesWithDistricts } from '@/data';
import { MandiType } from '@prisma/client';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const licenceSchema = z.object({
  mandiType: z.string(),
  mandiState: z.string().optional(),
  madiDistrict: z.string().optional(),
  aadharNumber: z.string().min(12, 'Aadhar number must be 12 digits').regex(/^\d{12}$/, 'Invalid Aadhar number'),
  additionalNumber: z.string().optional(),
  currentLocation: z.string().min(1, 'Current location is required'),
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  village: z.string().min(1, 'Village is required'),
  city: z.string().min(1, 'City is required'),
  pincode: z.string().min(6, 'Pincode must be 6 digits').max(6),
  work: z.string().min(1, 'Work is required'),
  income: z.string().min(1, 'Income is required'),
  storagePlace: z.string().min(1, 'Storage field is required'),
  storageLocation: z.string().min(1, 'Storage location is required'),
  aadharPhotos: z.array(z.string()).min(3, 'Upload front, back, and passport photos'),
  storageImages: z.array(z.string()).min(3, 'Upload at least 3 storage location photos'),
  declaration: z.boolean().refine(val => val === true, 'Declaration is required'),
  terms_condition: z.boolean().refine(val => val === true, 'Terms and conditions must be accepted')
}).refine(data => data.mandiType !== 'Mini Mandi' || (data.mandiState && data.madiDistrict), {
  message: "MiniMandi requires both state and district",
  path: ["mandiState", "madiDistrict"]
});


type LicenceFormData = z.infer<typeof licenceSchema>;

export default function Licence() {

  const [confirmation, setconfirmation] = useState(false)
  const [error, seterror] = useState("")
  const [isloading, setisloading] = useState(false);

  const { register, setValue, handleSubmit, control, formState: { errors, isSubmitting }, watch } = useForm<LicenceFormData>({
    resolver: zodResolver(licenceSchema),
    defaultValues: {
      mandiType: "",
      mandiState: "",
      madiDistrict: "",
      aadharNumber: "",
      additionalNumber: "",
      aadharPhotos: [],
      currentLocation: "",
      state: "Rajasthan",
      district: "",
      village: "",
      city: "",
      pincode: "",
      work: "",
      income: "",
      storagePlace: "",
      storageLocation: "",
      storageImages: [],
      declaration: false,
      terms_condition: false
    }
  });

  const hadleItemAdd = async (data: LicenceFormData) => {
    const { mandiType, ...values } = data;

    try {
      const mandiMap = {
        "Mini Mandi": MandiType.MINI_MANDI,
        "All India Mandi": MandiType.ALL_INDIA_MANDI
      }
      setisloading(true)
      const response = await fetch("/api/getLicence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mandiType: mandiMap[mandiType as keyof typeof mandiMap] ?? MandiType.OTHER,
          ...values
        })
      })

      if (!response.ok) {
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
      const aadharPhotos = watch("aadharPhotos") as string[]
      setValue("aadharPhotos", [...aadharPhotos, image])
    },
    Delete: (image: string) => {
      const aadharPhotos = watch("aadharPhotos") as string[]
      setValue("aadharPhotos", aadharPhotos.filter((item) => item !== image))
    }
  }

  const handleStorageLocaitonMedia = {
    Add: (image: string) => {
      const storageImages = watch("storageImages") as string[]
      setValue("storageImages", [...storageImages, image])
    },
    Delete: (image: string) => {
      const storageImages = watch("storageImages") as string[]
      setValue("storageImages", storageImages.filter((item) => item !== image))
    }
  }

  const formatAadharNumber = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  if (confirmation) {
    return (
      <Successfull setConformation={setconfirmation} title={"Your license application has been successfully submit to our platform. please wait for our response"} imgurl="/welcome.jpg" />
    )
  }

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
          <div className=" w-full h-full flex p-8 text-white"></div>

        </div>


        <form onSubmit={handleSubmit(hadleItemAdd)}>
          <div className="space-y-10 divide-y [&>div_>_h1]:mt-10 [&>div]:px-4 sm:[&>div]:px-8 md:[&>div]:px-10 [&>div]:space-y-4">
            <div className="title w-full">
              <h1 className="tagline text-center text-[#002f34] font-semibold text-3xl my-3">Apply For License of Mandi</h1>
            </div>

            <div className="personal_information">
              <h1 className="tagline  text-[#002f34] font-semibold text-2xl">Select Mandi</h1>

              <div className=" personal_informationfield space-y-2">
                <Controller
                  name="mandiType"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      Setquantity={field.onChange}
                      quntity={field.value as string}
                      fields={["All India Mandi", "Mini Mandi"]}
                      nameDrop="Mandi"
                    />
                  )}
                />

                {watch("mandiType") == "Mini Mandi" && (
                  <div className=" flex items-center justify-between flex-wrap *:basis-52 [&>div]:grow gap-4">

                    <div className="sellingoption">
                      <div className='flex items-center'>
                        <h1 className=" text-[#002f34] text-xl my-2">State</h1>
                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                      </div>

                      <Controller
                        name="mandiState"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            Setquantity={field.onChange}
                            quntity={field.value as string}
                            fields={Object.keys(statesWithDistricts)}
                            nameDrop="state"
                          />
                        )}
                      />
                    </div>

                    <div className="sellingoption">
                      <div className='flex items-center'>
                        <h1 className=" text-[#002f34] text-xl my-2">Distict</h1>
                        <span className=" text-[#da4f43] text-xl my-2">*</span>
                      </div>

                      <Controller
                        name="madiDistrict"
                        control={control}
                        render={({ field }) => (
                          <Dropdown
                            Setquantity={field.onChange}
                            quntity={field.value as string}
                            fields={statesWithDistricts[watch('mandiState') as IStatesWithDistricts]}
                            nameDrop="district"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="personal_information">
              <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Personal Information</h1>

              <div className="personal_informationfield space-y-2">
                <div className="aadharNumber">
                  <div className='flex items-center'>
                    <h1 className=" text-[#002f34] text-xl my-2">Aadhar Number</h1>
                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                  </div>

                  <Controller
                    name="aadharNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        className="Pinput w-full"
                        maxLength={14}
                        value={formatAadharNumber(field.value)}
                        onChange={(e) => {
                          const formattedValue = formatAadharNumber(e.target.value);
                          field.onChange(formattedValue);
                          setValue("aadharNumber", formattedValue.replace(/\s/g, ""))
                        }}
                        placeholder="xxxx xxxx xxxx"
                      />
                    )}
                  />
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
                      {...register("currentLocation")}
                    />
                  </div>

                  <div className="additionalNumber">
                    <div className='flex items-center'>
                      <h1 className=" text-[#002f34] text-xl my-2">other Number</h1>
                      {/* <span className=" text-[#da4f43] text-xl my-2">*</span> */}
                    </div>

                    <Controller
                      name="additionalNumber"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          className='Pinput w-full'
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 10) return;
                            field.onChange(value)
                          }}
                        />
                      )}
                    />
                  </div>
                </div>


                <div className="aadharPhotos flex items-center justify-evenly flex-wrap gap-4 [&>div_div:nth-child(2)]:mx-auto">
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

                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          Setquantity={field.onChange}
                          quntity={field.value as string}
                          fields={Object.keys(statesWithDistricts)}
                          nameDrop="Option"
                        />
                      )}
                    />
                  </div>

                  <div className="sellingoption grow">
                    <div className='flex items-center'>
                      <h1 className=" text-[#002f34] text-xl my-2">district</h1>
                      <span className=" text-[#da4f43] text-xl my-2">*</span>
                    </div>

                    <Controller
                      name="district"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          Setquantity={field.onChange}
                          quntity={field.value as string}
                          fields={statesWithDistricts[watch('state') as IStatesWithDistricts]}
                          nameDrop="Option"
                        />
                      )}
                    />
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
                      {...register("city")}
                    />
                  </div>
                  <div className="village">
                    <div className='flex items-center'>
                      <h1 className=" text-[#002f34] text-xl my-2">Village</h1>
                      <span className=" text-[#da4f43] text-xl my-2">*</span>
                    </div>
                    <input
                      type="text"
                      className='Pinput w-full'
                      {...register("village")}
                    />
                  </div>
                  <div className="city">
                    <div className='flex items-center'>
                      <h1 className=" text-[#002f34] text-xl my-2">pin code</h1>
                      <span className=" text-[#da4f43] text-xl my-2">*</span>
                    </div>

                    <Controller
                      name="pincode"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          className='Pinput w-full'
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 6) return;
                            field.onChange(value)
                          }}
                        />
                      )}
                    />
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

                    <Controller
                      name="work"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          Setquantity={field.onChange}
                          quntity={field.value as string}
                          fields={Profession}
                          nameDrop="Option"
                        />
                      )}
                    />
                  </div>

                  <div className="sellingoption">
                    <div className='flex items-center'>
                      <h1 className=" text-[#002f34] text-xl my-2">Income</h1>
                      <span className=" text-[#da4f43] text-xl my-2">*</span>
                    </div>

                    <Controller
                      name="income"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          Setquantity={field.onChange}
                          quntity={field.value as string}
                          fields={Income}
                          nameDrop="Option"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="storagePlace flex items-center flex-wrap [&>div]:grow [&>div]:basis-48 gap-4">
                  <div className="village">
                    <div className='flex items-center'>
                      <h1 className=" text-[#002f34] text-xl my-2">Storage Place</h1>
                      <span className=" text-[#da4f43] text-xl my-2">*</span>
                    </div>
                    <input
                      type="text"
                      className='Pinput w-full'
                      {...register("storagePlace")}
                    />
                  </div>
                  <div className="city">
                    <div className='flex items-center'>
                      <h1 className=" text-[#002f34] text-xl my-2">Storage Location</h1>
                      <span className=" text-[#da4f43] text-xl my-2">*</span>
                    </div>
                    <input
                      type="text"
                      className='Pinput w-full'
                      {...register("storageLocation")}
                    />
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
                    <input
                      type="checkbox"
                      {...register("declaration")}
                      id="declaration"
                      className='w-6 h-6'
                    />
                    <label htmlFor='declaration' className=" text-[#002f34] text-xl my-2">Declaration of Accuracy</label>
                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                    <span className=" text-[green] text-xl underline my-2">About</span>
                  </div>

                  <div className="liveStreaming flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("terms_condition")}
                      id="tems_condition"
                      className='w-6 h-6'
                    />
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

              <Button type='submit' disabled={isloading} variant={"Login"} className='my-9' >
                {isloading ? "Loading..." : "Apply"}
              </Button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

