"use client";
import React, { useEffect, useState } from "react";
import { ProductImages, StarRating } from "./component";
import { RecordModel } from "pocketbase";
import { getProductById } from "@/app/sever/general";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/app/login/components";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Star1 } from "iconsax-react";
import Footer from "@/app/components/footer";
import ReviewComponent from "@/app/components/review";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, SetProduct] = useState<RecordModel | null>();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [user, setUser] = useState({ id: '123' });

  useEffect(() => {
    const fetchInitialData = async () => {
      const productResponse = await getProductById(params.id, ["images"]);
      console.log("dfdsdsfds", productResponse);
      SetProduct(productResponse);
    };

    fetchInitialData();
  }, [params.id, router]);

  const handleReviewSubmit = (reviewData: ReviewData) => {
    console.log("Review submitted:", reviewData);
    // Here you might update your UI or send the data to a parent component
  };

  return (
    <>
      <section className=" p-12 pt-24 sm:p-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="col-span-5 lg:col-span-3">
            <ProductImages
              id={product?.images[0].id}
              images={product?.images[0].photos ?? []}
            />
          </div>
          <div className="col-span-5 lg:col-span-2 p-4 space-y-6">
            <h1 className="text-2xl sm:text-6xl font-bold">
              {product?.name ?? "Product Name"}
            </h1>
            <h2 className="flex flex-wrap text-lg sm:text-2xl items-center gap-4">
              {" "}
              <StarRating rating={product?.ratings ?? 0} /> {product?.ratings}
            </h2>
            <h1 className="text-xl sm:text-2xl ">
              GH₵ {product?.price ?? "Product price"}
            </h1>

            <p className="sm:text-xl">
              <span className="px-4 py-1 bg-primary/20 rounded-md mr-2">
                {product?.stock}
              </span>{" "}
              left in Stock
            </p>
            <div className="space-y-3">
              <p className="text-xl">Varients</p>
              <div className="space-x-3 flex flex-wrap">
                <button className="bg-primary/20 border-primary border-2 px-8 py-2 rounded-full">
                  S
                </button>
                <button className="bg-primary/20 px-8 py-2 rounded-full">
                  M
                </button>
                <button className="bg-primary/20 px-8 py-2 rounded-full">
                  L
                </button>
                <button className="bg-primary/20 px-8 py-2 rounded-full">
                  XL
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xl">Colours</p>
              <div className="space-x-3">
                <button className="bg-red-600/20 px-4 py-2 rounded-full">
                  R
                </button>
                <button className="bg-blue-600/20 border-blue-600 border-2  px-4 py-2 rounded-full">
                  B
                </button>
                <button className="bg-green-600/20 px-4 py-2 rounded-full">
                  G
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                QTY:{" "}
                <Input
                  className="bg-primary/20 max-w-fit w-[80px]"
                  required
                  id="quantity"
                  placeholder="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <Button>Add To Cart</Button>
              <Button variant={"outline"}>Buy Now</Button>
            </div>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <h1 className="text-xl sm:text-2xl ">Description </h1>
            <div
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
          </div>
          <ReviewComponent
            user={user}
            product={product}
            onReviewSubmit={handleReviewSubmit}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
