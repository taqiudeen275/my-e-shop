"use client"

import { getProducts } from '@/app/sever/general';
import { RecordModel } from 'pocketbase';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/app/components/product-card';
import LoadingScreen from '@/app/loading';

export const Search = (
  {
    params,
  }: {
    params: { query: string };
  }
) => {
  const [products, setProducts] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchQueryData = async () => {
      setLoading(true);
      try {
        // Construct a filter query that searches in both name and description
        const filterQuery = `name~"${params.query}" || description~"${params.query}"`;
        
        const productResponse = await getProducts(
          ["images", "categories"],
          filterQuery
        );
        setProducts(productResponse);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQueryData();
  }, [params.query]);

  if (loading) {
    return <div>
      <LoadingScreen/>
    </div>;
  }

  return (
    <div className="flex min-h-screen md:flex-none flex-col gap-5 md:gap-1 flex-wrap  p-12 pt-24 sm:p-24">
      <h1 className="text-2xl font-bold mb-4">Search Results for : <span className='text-primary'>{params.query}</span></h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
                <div key={product.id}>
                <ProductCard product={product} inProduct={true} />
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search
