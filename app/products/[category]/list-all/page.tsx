'use client'

import Footer from '@/app/components/footer';
import ProductCard from '@/app/components/product-card';
import { Button } from '@/app/components/ui/button';
import { fetchForProuctsPage, getCategoryById, getProducts } from '@/app/sever/general';
import pb from '@/lib/pocketbase_client';
import Image from 'next/image';
import Link from 'next/link';
import { RecordModel } from 'pocketbase';
import React, { useEffect, useState } from 'react'

const ProductCategoryViewAll = ({ params }: { params: { category: string } }) => {
    const [products, setProducts] = useState<RecordModel[]>([])
    const [category, setCategory] = useState("Category Name")
    useEffect(() => {
        const fetchInitialData = async () => {
            const productResponse = await getProducts(['images', 'categories'], `categories="${params.category}"`);
            const catResponse = await getCategoryById(params.category);
            setCategory(catResponse!.name);
            setProducts(productResponse);
        }
        fetchInitialData();
    }, [params.category]);
    return (
        <>
            <div className='flex min-h-screen flex-col items-center  p-12 pt-24 sm:p-24'>

                <section className='w-full'>
                    <h1 className='text-2xl sm:text-2xl font-medium mb-8'>All {products.length > 0 &&  products[0].expand?.categories?.name}</h1>
                    <div className='flex sm:flex-wrap flex-col sm:flex-row gap-5 items-center'>
                        {products.map(product =>
                            <div key={product.id}>
                                <ProductCard product={product} inProduct={true} />
                            </div>
                        )}
                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}

export default ProductCategoryViewAll