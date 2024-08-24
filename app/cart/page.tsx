'use client'
import React from "react";
import { CartItem } from "./components";
import { getCart, CartItemProp } from "@/lib/cart";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";

export default function CartPage() {
  const cartProductItems = getCart()

  return (
    <div className="w-full  pt-24  p-12 sm:p-24">
      <h2 className="text-xl sm:text-3xl font-bold mb-4">My Cart</h2>
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-start w-full">
        <div className="w-full lg:w-2/3 carttable rounded-md py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">
              <thead >
                <TableRow>
                  <TableHead
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </TableHead>
                  <TableHead
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </TableHead>
                  <TableHead
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </TableHead>
                  <TableHead
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Price
                  </TableHead>
                </TableRow>
              </thead>
              <TableBody className=" divide-y divide-gray-200">
                {cartProductItems.map((product) => (
                  <CartItem key={product.id} cartProduct={product} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-full lg:w-1/3 mb-5 px-4 md:px-8">
          <div className="flex flex-col gap-2">

            <form action="#" method="post">
              <div className="flex flex-col gap-3 p-3 rounded-lg">
                <h3 className="font-bold text-xl">Cart Total</h3>
                <div className="gap-3 grid grid-cols-2">
                  <h3 className="">Cart Subtotal</h3>
                  <h3 className="font-semibold text-right">$7,000</h3>
                </div>
                <div className="gap-3 grid grid-cols-2">
                  <h3 className="">Discount</h3>
                  <h3 className="font-semibold text-right">$2,00</h3>
                </div>
                <div className="gap-3 grid grid-cols-2">
                  <h3 className="">Cart Subtotal</h3>
                  <h3 className="font-semibold text-right">$7,000</h3>
                </div>
                <button className="border rounded-full p-2 bg-gray-950 text-white w-full">
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
