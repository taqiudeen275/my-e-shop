import React from 'react';
import { ArrowLeft, Package, Truck, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecordModel } from 'pocketbase';
import Image from "next/image";
import pb from '@/lib/pocketbase_client';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: RecordModel;
  selected_varient_name: string;
  selected_color_name: string;
}



interface OrderDetailPageProps {
  order: RecordModel;
}

const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ order }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Order Details At {formatDate(order.created)}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order #{order.id}</span>
              <Badge className={`${getStatusColor} text-white`}>
                {order.status}
              </Badge>
            </CardTitle>
            <CardDescription>
              Placed on {formatDate(order.created)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Package className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Items</p>
                  <ul className="mt-2 divide-y divide-gray-200">
                    {order.order_items.map((item: { id: React.Key | null | undefined; product: { expand: { images: { collectionId: any; id: any; photos: any[]; }; }; }; selected_varient_name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; selected_color_name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; price: number; }) => (
                      <li key={item.id} className="py-3 flex justify-between">
                        <div className="flex items-center">
                          <Image width={200} height={200} src={`${pb.client.baseUrl}/api/files/${item.product.expand?.images.collectionId}/${item.product.expand?.images.id}/${item.product.expand?.images.photos[0]}`} alt="Product" className="h-16 w-16 rounded-md object-cover mr-4" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.selected_varient_name}</p>
                            <p className="text-sm text-gray-500">{item.selected_color_name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-4">
                <Truck className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Shipping Information</p>
                  <p className="mt-1 text-sm text-gray-500">Shipping Cost: ${order.shipping_cost}</p>
                  {/* Add more shipping details here */}
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-4">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Information</p>
                  <p className="mt-1 text-sm text-gray-500">Method: {order.payment_method}</p>
                  <p className="mt-1 text-sm text-gray-500">Status: {order.status}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <div className="w-full flex justify-between items-center">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${order.total.toFixed(2)}</p>
            </div>
          </CardFooter>
        </Card>

        {order.notes && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;