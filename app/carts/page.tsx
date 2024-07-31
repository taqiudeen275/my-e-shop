import React from "react";
import CartItem from "./components";
import { CountrySelect } from "./components";

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Floral Print Wrap Dress",
      price: 20.5,
      quantity: 2,
      color: "Blue",
      size: "42",
      image: "/elexa.jpg",
    },
    {
      id: 2,
      name: "Floral Print Wrap Dress",
      price: 30.5,
      quantity: 1,
      color: "Red",
      size: "42",
      image: "/GameBoy.jpg",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="header p-4 px-5 md:px-12">
        <h2 className="text-2xl font-semibold mb-4">Shopping Bag</h2>
        <p>
          <span className="text-[12px] font-semibold">
            {" "}
            {cartItems.length} items{" "}
          </span>{" "}
          in your bag
        </p>
      </div>
      <div className="flex gap-4 justify-center items-start w-full">
        <div className="w-[70%] carttable rounded-md shadow-md">
          <CartItem Cartitems={cartItems} />
        </div>
        <div className="flex flex-col w-[30%] ">
          <div className="flex flex-col gap-2 ">
            <form action="#" method="post">
              <div className="flex flex-col gap-3 shipping-details p-3 ">
                 <h3 className="font-semibold">Calculated Shipping</h3>
                <div className="form-group">
                  <CountrySelect />
                </div>
                <div className="gap-3 grid grid-cols-2">
                  <input
                    type="text"
                    name="state"
                    className="input p-2 rounded-full bg-transparent border outline-[0.5px] "
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="zipcode"
                    className="input p-2 rounded-full bg-transparent border"
                    placeholder="zipcode"
                  />
                </div>
                <button className="border rounded-full p-2 bg-gray-950 text-white">
                  Update
                </button>
              </div>
            </form>
            <br />
            <hr />
            <form action="#" method="post">
              <div className="flex flex-col gap-3 shipping-details p-3 ">
                <h3 className="font-semibold">Coupon Code</h3>
                <p className="text-sm text-justify">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                  facilis maxime harum dignissimos, hic quis!
                </p>
                <input
                  type="text"
                  name="couponcode"
                  className="input p-2 rounded-full bg-transparent border "
                  placeholder="Coupon Code"
                />
                <button className="border rounded-full p-2 bg-gray-950 text-white">
                  Apply
                </button>
              </div>
            </form>
            <br />
            <form action="#" method="post">
              <div className="flex flex-col gap-3 shipping-details p-3 shadow-md bg-primary rounded-lg">
                 <h3 className="font-bold text-xl">Cart Total</h3>
                <div className="gap-3 grid grid-cols-2 ">
                 <h3 className="font-thin">Cart Subtotal</h3>
                 <h3 className="font-semibold ">$7,000</h3>
                </div>
                <div className="gap-3 grid grid-cols-2 ">
                 <h3 className="font-thin">Discount</h3>
                 <h3 className="font-semibold ">$2,00</h3>
                </div>
                <div className="gap-3 grid grid-cols-2 ">
                 <h3 className="font-thin">Cart Subtotal</h3>
                 <h3 className="font-semibold ">$7,000</h3>
                </div>
                <button className="border rounded-full p-2 bg-gray-950 text-white">
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
