"use server"
import pb from "@/lib/pocketbase_client";
import { RecordModel } from "pocketbase";


export async function fetchOrdertWithItemsAndProducts(userId: string): Promise<any | null> {
    try {
        // Fetch the cart for the user
        const cartResult = await pb.client.collection('order').getFirstListItem(`user="${userId}"`, {
            expand: 'order_items',
        });

        if (!cartResult) {
            console.log('No cart found for this user');
            return null;
        }
        console.log('No cart found for this user', cartResult);

        // Extract the expanded cart items
        const orderItems = cartResult.expand?.order_items || [];
        if (orderItems.length>0) {
        // Fetch all products for the cart items
        const productIds = orderItems.map((item: any) => item.product);
        const productsResult = await pb.client.collection('products',).getList(1, 50, {
            filter: productIds.map((id: string) => `id="${id}"`).join('||'),
            expand: "images"
        });

        // Create a map of products for easy lookup
        const productsMap = new Map(productsResult.items.map(p => [p.id, p]));

        // Combine cart items with their respective products
        const fullCartItems: any = orderItems.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            product: productsMap.get(item.product),
            varients: item.varients,
            colors: item.colors,
            selected_varient_name: item.selected_varient_name,
            selected_color_name: item.selected_color_name,
        }));
        // Construct the final cart object
        const cart= {
            ...cartResult,
            order_items: fullCartItems,
        };
        return cart;
    }else{
        const cart= {
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