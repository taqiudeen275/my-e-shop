"use client";

import Footer from "@/app/components/footer";
import ProductCard from "@/app/components/product-card";
import ProductFiltter from "@/app/components/product-filtter";
import {
  getCategoryById,
  getProducts,
} from "@/app/sever/general";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";

const ProductCategoryViewAll = ({
  params,
}: {
  params: { category: string };
}) => {
  const [products, setProducts] = useState<RecordModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<RecordModel[]>([]);
  const [category, setCategory] = useState("Category Name");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchInitialData = async () => {
      const productResponse = await getProducts(
        ["images", "categories"],
        `categories="${params.category}"`
      );
      const catResponse = await getCategoryById(params.category);
      setCategory(catResponse!.name);
      setProducts(productResponse);
      setFilteredProducts(productResponse);
    };
    fetchInitialData();
  }, [params.category]);

  const handleFilterChange = (filters: {
    minPrice: any;
    maxPrice: any;
    ratings: any;
  }) => {
    const { minPrice, maxPrice, ratings } = filters;

    const filtered = products.filter((product) => {
      const price = product.price;
      const rating = product.ratings;

      const priceInRange =
        (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
      const ratingMatches =
        ratings.length === 0 || ratings.includes(Math.floor(rating));

      return priceInRange && ratingMatches;
    });

    setFilteredProducts(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setFilteredProducts(sortProducts(filteredProducts, value));
  };

  const sortProducts = (productsToSort: RecordModel[], sortMethod: string) => {
    let sortedProducts = [...productsToSort];
    switch (sortMethod) {
      case "alphabetic":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "latest":
        sortedProducts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        break;
      case "oldest":
        sortedProducts.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
        break;
      default:
        break;
    }
    return sortedProducts;
  };



  return (
    <>
      <div className="flex min-h-screen md:flex-none gap-5 md:gap-1 flex-wrap  p-12 pt-24 sm:p-24">
        <section className="w-[100%] md:w-[70%] ">
          <div className="flex pr-2  justify-between">
            <h1 className="text-2xl sm:text-2xl font-medium mb-8">
              All {category}
            </h1>
            <Select onValueChange={handleSortChange} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>products</SelectLabel>
                  <SelectItem value="alphabetic">A-Z</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">oldest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex sm:flex-wrap flex-col sm:flex-row gap-5 items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} inProduct={true} />
                </div>
              ))
            ) : (
              <p>No Products Found</p>
            )}
          </div>
        </section>
        <section className="md:w-[300px] w-full ">
          <ProductFiltter onFilterChange={handleFilterChange} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductCategoryViewAll;