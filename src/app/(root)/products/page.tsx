
import React from 'react'
import ProductCard from "@/components/product-card";
import { getProducts } from '@/actions/product.actions'
import SortOptions from '@/components/products/sort-options'
import FiltersList from '@/components/products/filters-list'
import FilterOptions from '@/components/products/filter-options';
import SideBar from '../../../components/custom-sidebar';



const PrductList = async () => {

    const products = await getProducts();

    return (
        <div className="container max-w-screen-2xl w-full min-h-body flex gap-2 sm:gap-4 md:gap-6 justify-center relative px-2 sm:px-4 md:px-8 py-4">
            {/* Left */}
            <SideBar >
                <FilterOptions />
            </SideBar>


            <div className="rightpart flex-1 rounded-md border-2 space-y-2 px-5 py-4">
                <div className="headerpart flex z-30 items-center justify-between">
                    <div className="left flex items-center gap-2">
                        <h1 className='text-[#2e054e] font-semibold'>1048</h1>
                        <h1 className='text-[#2e054e] text-sm'>Farmers in Katawer</h1>
                    </div>

                    <SortOptions />

                </div>

                <div className="py-3">
                    <FiltersList />
                </div>

                <div className="listedpart w-full"
                    style={{
                        display: "grid",
                        gap: 5,
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    }}
                >
                    {products.map((product, index) => (
                        <ProductCard product={product as any} key={index} />
                    ))}

                </div>

            </div>
        </div>
    )
}

export default PrductList