"use client"
import { getProducts } from "@/actions/product.actions"
import ProductCard from "@/components/product-card"
import { ProductType } from "@/lib/types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


function ListedCrops() {
  const [listedCrops, setlistedCrops] = useState<ProductType[]>([])

  const { data } = useSession()

  const userID = data?.user.id

  useEffect(() => {
    if (!userID) return

    const handleListedProduct = async () => {
      try {
        const ListedProduct = await getProducts(userID)
        setlistedCrops(ListedProduct)
      } catch (error: any) {
        console.error(error.message)
      }
    }
    handleListedProduct()
  }, [userID])




  return (
    <div className="space-y-2">
      <h1 className='text-xl font-semibold text-[#002f34] px-2'>Listed Crops</h1>
      <div className="editdetails rounded-md border-2 shadow-lg py-5 sm:px-5 px-2">

        {
          listedCrops.length != 0 ? (
            <div className="listedpart w-full px-2"
              style={{
                display: "grid",
                gap: 10,
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              {
                listedCrops.map((item, index) => (
                  <ProductCard product={item} key={index} />
                ))
              }
            </div>
          ) : (
            <h1 className='px-10 text-[#002f34] font-semibold text-xl'>No Saved Crops...</h1>
          )
        }
      </div>
    </div>
  )
}


export default ListedCrops