"use client"
import { Button } from "@/components/ui/button";
import { CartItemProp, removeFromCart } from "@/lib/cart";
import pb from "@/lib/pocketbase_client";
import Image from "next/image";
import { RecordModel } from "pocketbase";
import { useState, useEffect } from 'react';

export const CartItem = ({ cartProduct }: {cartProduct: CartItemProp}) => {
  const [productQuantity, setProductQuantity] = useState(cartProduct.quantity);

  const decreaseQuantity = () => {
    if (productQuantity === 1){
      removeFromCart(cartProduct.id);
    }else{

      setProductQuantity((prev) => (prev > 1 ? prev - 1 : 1 ));
    }
    
  };

  const increaseQuantity = () => {
    setProductQuantity((prev) => prev + 1);
  };
  return (
    <tr >
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-24 w-24">
          <Image
            src={`${cartProduct.image}`}
            alt={"product image"}
            width={96}
            height={96}
            className="h-24 w-24 rounded-md object-cover"
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium ">
            {cartProduct.name}
          </div>
          {cartProduct.color && <div className="text-sm text-gray-500">
            Color: {cartProduct.color}
          </div>}
          {cartProduct.varient && <div className="text-sm text-gray-500">
            Color: {cartProduct.varient}
          </div>}
          
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm ">
        ${cartProduct.price.toFixed(2)}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        
        <Button 
        variant={"secondary"}
          className="px-4 py-1"
          onClick={decreaseQuantity}
        >
          -
        </Button>
        <span className="px-4 py-1">
            {productQuantity}
        </span>
        <Button 
        variant={"secondary"}
          className="px-4 py-1"
          onClick={increaseQuantity}
        >
          +
        </Button>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium ">
        ${(cartProduct.price * productQuantity).toFixed(2)}
      </div>
    </td>
  </tr>
  );
};
// export const CountrySelect = () => {
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');
  
//     useEffect(() => {
//       fetch('https://restcountries.com/v3.1/all')
//         .then(response => response.json())
//         .then(data => {
//           const sortedCountries = data
//             .map(country => ({
//               name: country.name.common,
//               code: country.cca2
//             }))
//             .sort((a, b) => a.name.localeCompare(b.name));
//           setCountries(sortedCountries);
//         })
//         .catch(error => console.error('Error fetching countries:', error));
//     }, []);
  
//     return (
//       <select
//         value={selectedCountry}
//         name="country"
//         onChange={(e) => setSelectedCountry(e.target.value)}
//         className="p-3 block w-full mt-1 rounded-full bg-transparent border dark:bg-gray-950 "
//       >
//         <option value="">Select a country</option>
//         {countries.map((country) => (
//           <option key={country.code} value={country.code}>
//             {country.name}
//           </option>
//         ))}
//       </select>
//     );
//   };


