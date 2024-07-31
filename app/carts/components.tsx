"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';

const CartItem = ({ Cartitems }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead >
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Price
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {Cartitems.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-24 w-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium ">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Color: {item.color}
                    </div>
                    <div className="text-sm text-gray-500">
                      Size: {item.size}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">
                  ${item.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border border-gray-300 rounded-l   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                  <button
                    className="px-2 py-1 border border-gray-300 rounded-r  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium ">
                  ${(item.price * quantity).toFixed(2)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export const CountrySelect = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
  
    useEffect(() => {
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
          const sortedCountries = data
            .map(country => ({
              name: country.name.common,
              code: country.cca2
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
          setCountries(sortedCountries);
        })
        .catch(error => console.error('Error fetching countries:', error));
    }, []);
  
    return (
      <select
        value={selectedCountry}
        name="country"
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="p-3 block w-full mt-1 rounded-full bg-transparent border dark:bg-gray-950 "
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    );
  };


export default CartItem;


