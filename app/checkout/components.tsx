"use client"

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { CartItemProps, CartProps } from '../sever/cart';
import pb from '@/lib/pocketbase_client';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe("pk_test_kX3TrpOutLWrNWQBhtthK8VQ002CbVodQv");

interface CheckoutFormProps {
  price: number; // Price in cents
  cart: CartProps;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, cart }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [issuccess, setIsSuccess] = useState(false)
  const [paidFailed, setPaidFailed] = useState("")

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    async function fetchData() {
   const responds = await createPaymentIntent(price);
    setClientSecret(responds.clientSecret!)
    }
    fetchData();
  }, [price]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      setPaidFailed(result.error.message!)
      console.log(result);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setIsSuccess(true);
        const orderItemsPromises = cart.cart_items.map(async (cartItem) => {
          const orderItem: any = createOrderItem({
            product: cartItem.product.id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            varient: cartItem.varients?.id,
            color: cartItem.colors?.id,
            selected_varient_name: cartItem.selected_varient_name,
            selected_color_name: cartItem.selected_color_name,
          })
          return orderItem
        })
        const createdOrderItems = await Promise.all(orderItemsPromises);
      const createdOrder =  await createOrder({
          total: cart.total ,
          status: "Pending",
          payment_method: result.paymentIntent.payment_method,
          payment_status: "Paid",
          user: cart.user,
          order_items: createdOrderItems.map(item => item.id),
        });


        // delete cart item
        const cartItemsPromises = cart.cart_items.map(async (cartItem) => {
          return await deleteCartItemById(cartItem.id)
        })
         await Promise.all(cartItemsPromises);

        router.push('/checkout/success');
      }
    }
 
    setIsLoading(false);  

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <p className="text-lg font-semibold">Total: ${(price / 100).toFixed(2)}</p>
      </div>
      <CardElement className="border p-3 rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
       { isLoading?  <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> :(issuccess?"Successfully paid": `Pay ${(price / 100).toFixed(2)}`)}
      </button>
      <div>
        {paidFailed && <span className="bg-red-600/60">{paidFailed}</span>}
      </div>
    </form>
  );
};

interface StripeWrapperProps {
  price: number; 
  cart: CartProps
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({ price, cart }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm price={price} cart={cart} />
  </Elements>
);

export default StripeWrapper;





export const OrderItem = ({ cartProduct }: { cartProduct: CartItemProps;}) => {
  const [productQuantity, setProductQuantity] = useState(cartProduct.quantity);
  const [isLoading, setIsLoading] = useState(false)


  return (
    <tr >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-24 w-24">
            <Image
              src={`${pb.client.baseUrl}/api/files/${cartProduct.product.expand?.images?.collectionId}/${cartProduct.product.expand?.images.id}/${cartProduct.product.expand?.images.photos[0]}`}
              alt={"product image"}
              width={96}
              height={96}
              className="h-24 w-24 rounded-md object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium ">
              {cartProduct.product.name}
            </div>
            {cartProduct.colors && <div className="text-sm text-gray-500">
              Color: {cartProduct.selected_color_name}
            </div>}
            {cartProduct.varients && <div className="text-sm text-gray-500">
              Varient: {cartProduct.selected_varient_name}
            </div>}

          </div>
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



import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createAddress, createOrder, createOrderItem, deleteCartItemById } from '../sever/general';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from 'next-client-cookies';
import { Triangle } from 'iconsax-react';
import { RecordModel } from 'pocketbase';
import { Span } from 'next/dist/trace';
import { createPaymentIntent } from '../sever/checkout';

const formSchema = z.object({
  type: z.enum(['billing', 'shipping']),
  is_default: z.boolean(),
  street: z.string().min(1, 'Street is required'),
  street_2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  zip_code: z.string().min(1, 'ZIP code is required'),
});

type FormValues = z.infer<typeof formSchema>;

export const AddressForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'billing',
      is_default: false,
      street: '',
      street_2: '',
      city: '',
      country: '',
      zip_code: '',
    },
  });
  const { toast } = useToast()
  const cookies = useCookies();

  const onSubmit = async (data: FormValues) => {
    pb.client.authStore.loadFromCookie(cookies.get('pb_auth') ?? "")
    const user = pb.client.authStore.model

    // Here you would typically call your server action
    const res = await createAddress({...data, user: user!.id})
    console.log(res);
    toast({
      description: "Address added successfully",
    })
    // For example: await addAddress(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
        
        <FormField
          control={form.control}
          name="is_default"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Set as default address
                </FormLabel>
                <FormDescription>
                  This address will be used as the default for future orders.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="1234 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="street_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apartment, suite, unit, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="ZIP Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Save Address</Button>
      </form>
    </Form>
  );
};

