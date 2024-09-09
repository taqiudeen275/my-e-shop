"use server"
import pb from "@/lib/pocketbase_client";
import { RecordModel } from "pocketbase";
import { getCartById, getCartItemById, updateCartById, updateCartItemById } from "./general";


export interface CaartImageProps{
    id: string;
    photos: string[];
    alt: string;
}

export interface ProductProps {
    id: string;
    name: string;
    price: number;
    sku: string;
    stock: number;
    tags: string;
    expand: [images?: CaartImageProps];
    categories: string;
    images: string;
    varients: string[];
    colors: string[];
    isFeatured: boolean;
    ratings: number;
    description: string;
}
export interface CartColorlProp {
    id: string;
    name: string;
    stock: number;
}

export interface CartVarientlProp {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
}

export interface CartItemProps {
    id: string;
    quantity: number;
    price: number;
    product: RecordModel;
    varients?: CartVarientlProp;
    colors?: CartColorlProp;
    selected_varient_name?: string;
    selected_color_name?: string;
}

export interface CartProps {
    id: string;
    user: string;
    cart_items: CartItemProps[];
    discount: number;
    total: number;
}

export async function fetchCartWithItemsAndProducts(userId: string): Promise<CartProps | null> {
    try {
        // Fetch the cart for the user
        const cartResult = await pb.client.collection('cart').getFirstListItem(`user="${userId}"`, {
            expand: 'cart_item, varients, colors',
        });

        if (!cartResult) {
            console.log('No cart found for this user');
            return null;
        }

        // Extract the expanded cart items
        const cartItems = cartResult.expand?.cart_item || [];
        if (cartItems.length>0) {
        // Fetch all products for the cart items
        const productIds = cartItems.map((item: any) => item.product);
        const productsResult = await pb.client.collection('products',).getList(1, 50, {
            filter: productIds.map((id: string) => `id="${id}"`).join('||'),
            expand: "images"
        });

        // Create a map of products for easy lookup
        const productsMap = new Map(productsResult.items.map(p => [p.id, p]));

        // Combine cart items with their respective products
        const fullCartItems: CartItemProps[] = cartItems.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            product: productsMap.get(item.product) as unknown as ProductProps,
            varients: item.varients,
            colors: item.colors,
            selected_varient_name: item.selected_varient_name,
            selected_color_name: item.selected_color_name,
        }));
        // Construct the final cart object
        const cart: CartProps= {
            id: cartResult.id,
            user: cartResult.user,
            cart_items: fullCartItems,
            discount: cartResult.discount,
            total: cartResult.total,
        };
        console.log("cart:===================",cart.cart_items[0].product)
        return cart;
    }else{
        const cart: CartProps= {
            id: cartResult.id,
            user: cartResult.user,
            cart_items: [],
            discount: cartResult.discount,
            total: cartResult.total,
        };
        return cart;

    }
    } catch (error) {
        console.error('Error fetching cart with items and products:', error);
        return null;
    }
}
// ---------------------------------------------------

export async function recalculateCartTotal(cartId: string): Promise<number> {
    const cart = await getCartById(cartId, ['cart_item']);
  
    const total = (cart?.expand?.cart_item as RecordModel[])?.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ) || 0;
  
    await updateCartById(cartId, {
      total: total - cart?.discount,
    });
  
    return total - cart?.discount;
  }
  
  export async function increaseCartItemQuantity(cartItemId: string, cartId: string): Promise<{ success: boolean; message: string; newQuantity?: number; newTotal?: number }> {
    try {
      const cartItem = await getCartItemById(cartItemId);
      
      // Increase quantity
      const newQuantity = cartItem?.quantity + 1;
      
      await updateCartItemById(cartItemId, {
        quantity: newQuantity,
      });
  
      // Recalculate cart total
      const newTotal = await recalculateCartTotal(cartId);
  
      return {
        success: true,
        message: 'Cart item quantity increased successfully',
        newQuantity,
        newTotal,
      };
    } catch (error) {
      console.error('Error increasing cart item quantity:', error);
      return { success: false, message: 'Failed to increase cart item quantity' };
    }
  }
  
  export async function decreaseCartItemQuantity(cartItemId: string, cartId: string): Promise<{ success: boolean; message: string; newQuantity?: number; newTotal?: number }> {
    try {
      const cartItem = await getCartItemById(cartItemId);
      
      // Decrease quantity, but not below 1
      const newQuantity = Math.max(1, cartItem?.quantity - 1);
      
      if (newQuantity === cartItem?.quantity) {
        return { success: false, message: 'Cannot decrease quantity below 1' };
      }
  
      await updateCartItemById(cartItemId, {
        quantity: newQuantity,
      });
  
      // Recalculate cart total
      const newTotal = await recalculateCartTotal(cartId);
  
      return {
        success: true,
        message: 'Cart item quantity decreased successfully',
        newQuantity,
        newTotal,
      };
    } catch (error) {
      console.error('Error decreasing cart item quantity:', error);
      return { success: false, message: 'Failed to decrease cart item quantity' };
    }
  }
  




