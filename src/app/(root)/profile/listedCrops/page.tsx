"use client"
import { getListedproduct } from "@/actions/listedProduct"
import { ThreeDCardDemo } from "@/components/addProduct"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


function ListedCrops() {
  const [listedCrops, setlistedCrops] = useState([])

  const { data } = useSession()

  const userID = data?.user.id
  
  useEffect(() => {
    if(!userID){
      return
    }
    const handleListedProduct = async () => {
      try {
        const ListedProduct = await getListedproduct(userID)
        setlistedCrops(ListedProduct)
      } catch (error) {
        console.error(error.message)
      }
    }
    handleListedProduct()
  }, [userID])




  return (
    <>
      <h1 className='text-xl font-semibold text-[#002f34] p-2 '>Listed Crops</h1>
      <div className="editdetails rounded-md border-2 shadow-lg py-5 px-5">

        {
          listedCrops.length != 0 ? (
            <div className="listedpart w-full px-2"
              style={{
                display: "grid",
                gap: 10,
                gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
              }}
            >
              {
                listedCrops.map((item, index) => (
                  <ThreeDCardDemo item={item} key={index} />
                ))
              }
            </div>
          ) : (
            <h1 className='px-10 text-[#002f34] font-semibold text-xl'>No Saved Crops...</h1>
          )
        }
      </div>
    </>
  )
}


export default ListedCrops