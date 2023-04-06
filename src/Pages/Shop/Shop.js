import React, { useContext } from 'react';
import { productProvider } from '../../Context/ProductContext';
import ProductCard from '../../Components/ProductCard/ProductCard';

const Shop = () => {
    const {products} = useContext(productProvider)
    return (
        <div className='mb-10'>
            <h3 className='font-semibold text-4xl text-center mb-10 mt-5'>Shop</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    products.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Shop;