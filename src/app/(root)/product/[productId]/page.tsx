import { Product_details_slider } from '@/components/product_details_slider'
import React from 'react'

function Page() {
    return (
        <div className="maincontainer w-full h-full">
            <div className="crousalcontainer w-full  flex justify-center">
                    <Product_details_slider />

            </div>
        </div>
    )
}

export default Page