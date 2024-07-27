"use client"
import { ThreeDCardDemo } from "@/components/addProduct";
import { useAppSelector } from "@/lib/redux";


function SavedItem() {
    const savedItem = useAppSelector((state) => state.product);
    return (
      <>
        <h1 className='text-xl font-semibold text-[#002f34] p-2 '>Saved Item</h1>
        <div className="editdetails rounded-md border-2 shadow-lg py-5 px-5">
          {
            savedItem.saved_item.length != 0 ? (
              <div className="listedpart w-full "
                style={{
                  display: "grid",
                  gap: 10,
                  gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
                }}
              >
                {
                  savedItem.saved_item.map((item, index) => (
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


  export default SavedItem
  