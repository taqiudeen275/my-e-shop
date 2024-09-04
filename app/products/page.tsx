'use client'
import { Card } from '@/components/ui/card'
import { RecordModel } from 'pocketbase'
import React, { useEffect, useState } from 'react'
import { fetchForProuctsPage, getCategories } from '../sever/general'
import Image from 'next/image'
import pb from '@/lib/pocketbase_client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductCard from '../components/product-card'
import Footer from '../components/footer'

const ProductList = () => {
  const [categories, SetCategories] = useState<RecordModel[]>([])

  useEffect(() => {
    const fetchInitialData = async () => {
      const productResponse = await fetchForProuctsPage();

      SetCategories(productResponse);
    }
    fetchInitialData();
  }, []);
  return (
    <>
    <div className='flex min-h-screen flex-col items-center  p-12 pt-24 sm:p-24'>
      <section className='w-full mt-8'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-8'>All Categories</h1>
        <div className='flex gap-3 flex-wrap justify-center  flex-col sm:flex-row'>
          {categories.map(category =>
            <Link href={`/products/${category.id}/list-all`} key={category.id} className='sm:w-[250px] sm:max-w-fit w-full rounded-lg overflow-hidden relative'>
              <Image src={`${pb.categoriesImageBaseURL}${category.id}/${category.image}`} alt={`${category.name} image`} width={500} height={500} className='w-full h-full object-cover filter brightness-[0.85] transition-all hover:scale-[1.2] hover:brightness-75 ' />
              <h1 className='absolute right-3 bottom-4 text-xl font-extrabold text-white  [text-shadow:_0_1px_10px_rgb(0_0_0_/_40%)] w-[50%] text-right'>{category.name}</h1>
            </Link>
          )}
        </div>
      </section>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <section className='w-full'>
        {categories.filter(category => category.products.length > 0 ).map(category =>
          <div key={category.id} className='w-full mb-16'>
            <div className="flex items-center justify-between">
              <h1 className='text-2xl sm:text-2xl font-medium mb-8'>{category.name}</h1>
              <Link href={`/products/${category.id}/list-all`} className='' ><Button variant={'link'}>More</Button> </Link>
            </div>
            <div className='flex sm:flex-wrap flex-col sm:flex-row gap-5 items-center'>
                {category.products.map((product: RecordModel) => 
                  <div key={product.id}>
                    <ProductCard product={product} inProduct={true} />
                  </div>
                )}
              </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </div>
        )}
      </section>
    
    </div>
    <Footer />
    </>
)
}

export default ProductList