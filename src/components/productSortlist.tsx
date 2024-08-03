

import { getProducts } from '@/actions/product.actions'
import React from 'react'
import ProductCard from './product-card'

async function ProductSortlist() {

    const products = await getProducts()
    return (
        <div className="listedpart w-full "
            style={{
                display: "grid",
                gap: 5,
                gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
            }}
        >
            {products.map((item, index) => (
                    <ProductCard key={index} product={item} />
            ))}
        </div>
    )
}

export default ProductSortlist