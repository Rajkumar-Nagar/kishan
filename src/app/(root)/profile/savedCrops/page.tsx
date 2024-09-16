"use client"
import ProductCard from "@/components/product-card";
import { useAppSelector } from "@/lib/redux";


function SavedItem() {
  const products = useAppSelector((state) => state.product);
  return (
    <div className="space-y-2">
      <h1 className='text-xl font-semibold text-[#002f34] px-2'>Saved Crops</h1>
      <div className="editdetails rounded-md border-2 shadow-lg py-5 sm:px-5 px-2">
        {
          products.saved_item.length != 0 ? (
            <div className="listedpart w-full "
              style={{
                display: "grid",
                gap: 10,
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              {
                products.saved_item.map((item, index) => (
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


export default SavedItem
