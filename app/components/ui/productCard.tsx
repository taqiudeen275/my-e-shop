/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun1, Heart, Star1 } from "iconsax-react";

interface CardContent {
  name: string;
  image: string;
  rating: number;
  price: number;
  discount: string;
}

const ProductCard = ({ name, image, rating, price, discount }: CardContent) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Card className="w-[300px] bg-primary-foreground rounded-3xl gap-3 flex flex-col ">
      <CardHeader className="relative w-full flex justify-center p-0  ">
        <div className="rounded-b-lg">
          <img
            src={`/` + image}
            alt=""
            className="w-full h-[250px] object-cover rounded-3xl"
          />
        </div>
        <div className="absolute p-2 flex justify-between w-full items-center top-0">
          <div className="rate p-2 rounded-full flex gap-1 bg-purple-800">
            <Sun1 className="text-white" />
            <p className="text-white">-{discount}</p>
          </div>
          <div
            className="rate p-2 rounded-full flex gap-1 bg-purple-800 cursor-pointer"
            onClick={toggleFavorite}
          >
            <Heart
              className="text-white"
              variant={isFavorite ? "Bold" : "Outline"}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex gap-1 justify-between p-2 h-[15%]">
        <CardTitle  className="text-primary">{name}</CardTitle>
        <p className="text-primary">GH ${price}</p>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <div className="rate p-2 rounded-full flex gap-1 bg-purple-800">
          <Star1 className="text-white" variant="Bold" />
          <p className="text-white">{rating}</p>
        </div>
        <Button className="rounded-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
