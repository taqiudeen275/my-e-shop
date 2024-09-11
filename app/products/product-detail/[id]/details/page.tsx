"use client";
import React, { useEffect, useState } from "react";
import { ProductImages, StarRating } from "./component";
import { RecordModel } from "pocketbase";
import { addToCart, createCartItem, getCart, getCartById, getProductById, updateCartById, updateCartItemById } from "@/app/sever/general";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/app/components/footer";
import { ReviewComponent, ReviewsList } from "@/app/components/review";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useCookies } from "next-client-cookies";
import pb from "@/lib/pocketbase_client";
import { Triangle } from "iconsax-react";


const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, SetProduct] = useState<RecordModel | null>();
  // varients and colors are the selected colors or varients 
  const [varient, setVarient] = useState<RecordModel | null>();
  const [color, setColor] = useState<RecordModel | null>();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState("");
  const [currentVarients, setCurrentVarients] = useState("");
  const [reviewTempUpdate, setReviewTempUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchLoading, setFetchIsLoading] = useState(false)
  

  const { toast } = useToast()
  const cookies = useCookies();

  useEffect(() => {
    const fetchInitialData = async () => {
      const productResponse = await getProductById(params.id, ["images", "colors", "varients"]);

      productResponse?.expand?.varients && setCurrentVarients(productResponse?.expand?.varients[0]?.id);
      productResponse?.expand?.varients && setVarient(productResponse?.expand?.varients[0]);
      if (productResponse?.colors.length > 0) {
        setCurrentColor(productResponse?.colors[0]?.id);
        setColor(productResponse?.colors[0]);
      }
      SetProduct(productResponse);
    };
    setFetchIsLoading(true)
    fetchInitialData();
    setFetchIsLoading(false);
  }, [cookies, params.id, router]);

  const handleReviewSubmit = (reviewData: any) => {
    setReviewTempUpdate(reviewTempUpdate + 1)
    toast({
      description: "Your review has been sent.",
    })
  };
  const onAddToCart = async () => {
    setIsLoading(true);

    pb.client.authStore.loadFromCookie(cookies.get('pb_auth') ?? "")
    const user = pb.client.authStore.model

    await addToCart(user?.id, product!.id, quantity, product!.price, varient?.id, color?.id,
      varient?.name,color?.name
    );
    toast({
      description: "The Products has been added to cart.",
    })
    setIsLoading(false);

  }

  return (
    isFetchLoading ?
    <div className="h-screen w-screen flex justify-center items-center">
      < span className="flex align-center justify-center animate-spin" > <Triangle className="" /> </span >
    </div > :   <>
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
              $ {product?.expand?.varients ? varient?.price : (product?.price ?? "Product price")}
            </h1>

            {(product?.expand?.varients ? varient?.stock === 0 : product?.stock === 0) ? <p className="sm:text-xl text-white px-4 py-1 bg-red-600/70 rounded-md mr-2 w-max">Out of Stock</p> : <p className="sm:text-xl">
              <span className="px-4 py-1 bg-primary/20 rounded-md mr-2">
                {product?.expand?.varients ? varient?.stock : (product?.stock ?? "")}
              </span>{" "}
              left in Stock
            </p>}
            {product?.expand?.varients && <div className="space-y-3">
              <p className="text-xl">Varients</p>
              <div className="space-x-3 flex flex-wrap">
                {product?.expand?.varients.map((v: any) => <button key={v.id} className={`bg-primary/20 border-primary ${currentVarients === v.id ? 'border-2 animate-bounce' : ''}  px-8 py-2 rounded-full`} onClick={() => { setCurrentVarients(v.id); setVarient(v); setQuantity(1) }}>
                  {v.name}
                </button>)}

              </div>
            </div>}
            {product?.colors.length > 0 && <div className="space-y-3">
              <p className="text-xl">Colours</p>
              <div className="space-x-3">

                {product?.colors.map((c: any) => <button key={c.id} className={`bg-${c.name.toLowerCase()}-600/20 px-4 py-2 rounded-full transition-all ${currentColor === c.id ? `border-2  border-${c.name.toLowerCase()}-600 animate-bounce` : ''} `} onClick={() => { setCurrentColor(c.id); setColor(c); }}>
                  {c.name[0]}
                </button>)}
                {/* <button className="bg-blue-600/20 border-blue-600 border-2  px-4 py-2 rounded-full">
                  B
                </button>
                <button className="bg-green-600/20 px-4 py-2 rounded-full">
                  G
                </button> */}
              </div>
            </div>}
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
                  max={product?.expand?.varients ? varient?.stock : product?.stock}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              {
                (product?.expand?.varients ? varient?.stock === 0 : product?.stock === 0)
                  ? <Button disabled>Add To Cart</Button> : <Button onClick={onAddToCart}>
                     {
              isLoading ?
                <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> :
                "Add To Cart"}</Button>
              }
            </div>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <h1 className="text-xl sm:text-2xl ">Description </h1>
            <div
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
          </div>
          <ReviewComponent
            productId={product?.id ?? 'null'}
            onReviewSubmit={handleReviewSubmit}
          />
        </div>
        <div className="mt-12">
          <h1 className="text-xl sm:text-2xl mb-4">Reviews </h1>

          <ReviewsList productId={product?.id ?? "null"} updated={reviewTempUpdate} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
