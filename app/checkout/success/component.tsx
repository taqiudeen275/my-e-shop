/* eslint-disable react/no-unescaped-entities */
'use client'
import React from 'react';
import { CheckCircle, Truck, Mail, ArrowRight, Package } from 'lucide-react';

interface OrderSuccessProps {
  orderNumber: string;
  estimatedDelivery: string;
  total: number;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({
  orderNumber,
  estimatedDelivery,
  total,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase.</p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order number:</span>
            <span className="font-semibold text-gray-800">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total amount:</span>
            <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Estimated delivery:</span>
            <span className="font-semibold text-gray-800">{estimatedDelivery}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 text-gray-700">
            <Truck className="w-6 h-6 flex-shrink-0" />
            <p>We'll send you shipping confirmation when your item(s) are on the way!</p>
          </div>
          
        </div>

        <div className="space-y-4">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>Track Your Order</span>
            <Package className="w-5 h-5" />
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center space-x-2">
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;