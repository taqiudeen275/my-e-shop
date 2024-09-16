"use server"

import pb from "@/lib/pocketbase_client"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { RecordModel } from "pocketbase"
import { recalculateCartTotal } from "./cart"


async function setupAuth() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    if (authCookie) {
      pb.client.authStore.loadFromCookie(authCookie.value)
    }
  } 

  async function createRecord(collectionName: string, record: any) {
    try {
      await setupAuth();
      const respond = await pb.client.collection(collectionName).create(record);
      return respond
    } catch (error: any) {
      console.error(`Error in creating ${collectionName}:`, error)
      return error.message;
    }
  }

  async function updateRecord(collectionName: string, record_id:string, record: any) {
    try {
      await setupAuth();
      const respond = await pb.client.collection(collectionName).update(record_id, record);
      return respond
    } catch (error: any) {
      console.error(`Error in updating ${collectionName}:`, error)
      return error.message;
    }
  }
  
  export const updateUserPassword = async (userId: string, currentPassword: string, newPassword: string) => {
    try {
      await setupAuth();
      // You'll need to implement this function in your backend to handle password updates securely
      const response = await pb.client.collection('users').update(userId, {
        oldPassword: currentPassword,
        password: newPassword,
        passwordConfirm: newPassword,
      });
      return response;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };
async function  deleteRecord(collectionName: string, record_id:string) {
  try {
    await setupAuth();
    await pb.client.collection(collectionName).delete(record_id);
    return "record deleted"
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error)
    return "record failed to delete"
  }
}


//   collections with relationships
const relationships: { [key: string]: { [key: string]: string[] } } = {
    users: {
      order: ['order_items'],
      review: [],
      address: [],
    },
    products: {
      review: [],
      varients: [],
      categories: [],
      images: [],
      colors: [],
    },
    categories: {
      products:[]
    },
  
  }

  
  async function fetchCollectionWithNestedPreload(collectionName: string, preloads: string[] = [], filterQuery?: string) {
    try {
      await setupAuth()
      
      let query = pb.client.collection(collectionName).getFullList({
        expand: preloads.join(','),
        filter: filterQuery ?? "",
        sort: '-created',
      })
  
      if (preloads.length > 0) {
        query = query.then(async (results) => {
          for (const item of results) {
            for (const preload of preloads) {
              if (item[preload]) {
                item[preload] = await fetchNestedRelation(collectionName, preload, item[preload])
              }
            }
          }
          return results
        })
      }
  
      return await query
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error)
      return []
    }
  }
  

  async function fetchNestedRelation(parentCollection: string, relation: string, ids: string | string[]) {
    const relatedCollection = pb.client.collection(relation)
    const idsArray = Array.isArray(ids) ? ids : [ids]
    const items = await relatedCollection.getFullList({ filter: `id ?= "${idsArray.join('"||id ?= "')}"` })
  
    // If there are nested relations, fetch them recursively
    if (relationships[parentCollection] && relationships[parentCollection][relation]) {
      for (const item of items) {
        for (const nestedRelation of relationships[parentCollection][relation]) {
          if (item[nestedRelation]) {
            item[nestedRelation] = await fetchNestedRelation(relation, nestedRelation, item[nestedRelation])
          }
        }
      }
    }
  
    return items
  }


  async function fetchItemWithNestedPreload(collectionName: string, id: string, preloads: string[] = []) {
    try {
      await setupAuth()
      
      let query = pb.client.collection(collectionName).getOne(id, {
        expand: preloads.join(',')
      })
  
      if (preloads.length > 0) {
        query = query.then(async (item) => {
          for (const preload of preloads) {
            if (item[preload]) {
              item[preload] = await fetchNestedRelation(collectionName, preload, item[preload])
            }
          }
          return item
        })
      }
  
      return await query
    } catch (error) {
      console.error(`Error fetching ${collectionName} with id ${id}:`, error)
      return null
    }
  }

  // force loging for mobile
export  async function logout(){
  await setupAuth()
  pb.client.authStore.clear()
} 
  
  // Get functions for each collection with optional nested preloading
  // Preloading are basically collections/models related to the collection you fetched
  // the functions below fetches all the items in those collections, with preload being optional
  export const getUsers = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('users', preloads, filterQuery)
  export const getAddresses = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('address', preloads, filterQuery)
  export const getCategories = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('categories', preloads, filterQuery)
  export const getColors = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('colors', preloads, filterQuery)
  export const getImages = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('images', preloads, filterQuery)
  export const getOrders = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('order', preloads, filterQuery)
  export const getCart = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('cart', preloads, filterQuery)
  export const getOrderItems = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('order_items', preloads, filterQuery)
  export const getCartItems = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('cart_item', preloads, filterQuery)
  export const getProducts = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('products', preloads, filterQuery)
  export const getReviews = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('review', preloads, filterQuery)
  export const getVariants = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('varients', preloads, filterQuery)
  
// fetch collection with Pagination

// the below are similar to the above but with this one fetches one instead of a collection with nested preloads options
export const getUserById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('users', id, preloads)
export const getAddressById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('address', id, preloads)
export const getCategoryById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('categories', id, preloads)
export const getColorById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('colors', id, preloads)
export const getImageById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('images', id, preloads)
export const getOrderById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('order', id, preloads)
export const getCartById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('cart', id, preloads)
export const getOrderItemById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('order_items', id, preloads)
export const getCartItemById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('cart_item', id, preloads)
export const getProductById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('products', id, preloads)
export const getReviewById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('review', id, preloads)
export const getVariantById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('varients', id, preloads)


// delete operation
// Only kept delete operations for what users can do but the admin have access to everything at the admin dashboard
export const deleteAddressById = (id: string) => deleteRecord('address', id)
export const deleteOrderById = (id: string) => deleteRecord('order', id)
export const deleteOrderItemById = (id: string) => deleteRecord('order_items', id)
export const deleteReviewById = (id: string) => deleteRecord('review', id)

export const deleteCartById = (id: string) => deleteRecord('cart', id)
export const deleteCartItemById = (id: string) => deleteRecord('cart_item', id)

// update operation
// same here
export const updateReviewById = (id: string,  record: any) => updateRecord('review', id, record)
// only to update products in stock number when a user place an order
export const updateProductById = (id: string,  record: any) => updateRecord('products', id, record)
// for updating that user own details
export const updateUserById = (id: string, record: any) => updateRecord('users', id, record)
// for updating that user own order
export const updateOrderById = (id: string,  record: any) => updateRecord('order', id, record)
export const updateAddressById = (id: string,  record: any) => updateRecord('address', id, record)
export const updateOrderItemById = (id: string,  record: any) => updateRecord('order_items', id, record)

export const updateCartById = (id: string,  record: any) => updateRecord('cart', id, record)
export const updateCartItemById = (id: string,  record: any) => updateRecord('cart_item', id, record)

// Add/Create Operations
export const createReview = (record: any) => createRecord('review', record)
export const createOrder = (record: any) => createRecord('order', record)
export const createAddress = (record: any) => createRecord('address', record)
export const createOrderItem = (record: any) => createRecord('order_items', record)
export const createCart = (record: any) => createRecord('cart', record)
export const createCartItem = (record: any) => createRecord('cart_item', record)


export async function fetchForProuctsPage(){
  await setupAuth()
  const categories = await getCategories();
  const products = await pb.client.collection("products").getList(1, 15, {sort: '-created', expand: "images"})

  const categorizedProducts = categories.map(category => {
    return {
      ...category,
      products: products.items.filter(product => product.categories.includes(category.id))
    };
  });

  return categorizedProducts;
}

// Search filters coming soon
// I mean products page filtering operations
export async function ExportCookies() {
  cookies().set('pb_auth', pb.client.authStore.exportToCookie());
}


// Define types
interface CartItem {
  id: string;
  quantity: number;
  price: number;
  product: string;
  varients?: string;
  colors?: string;
}

// interface Cart {
//   id: string;
//   user: string;
//   cart_item: string[];
//   discount: number;
//   total: number;
// }

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
  price: number,
  varientId?: string,
  colorId?: string,
  selected_varient_name?: string,
  selected_color_name?: string
) {
  try {
    // Authenticate as the user (you'll need to implement your auth strategy)
    // For example: await pb.collection('users').authWithPassword(email, password);

    // Check if the user has an existing cart
    const existingCarts = await getCart(["cart_item"], `user="${userId}"`);
    let cart: RecordModel;
    if (existingCarts.length === 0) {
      // Create a new cart if one doesn't exist
      cart = await pb.client.collection('cart').create({
        user: userId,
        cart_item: [],
        discount: 0,
        total: 0,
      });
    } else {
      cart = existingCarts[0];

    }

    // Check if the item already exists in the cart
    


    // const existingItems = cart.cart_item.find((ct: any) => {ct.product === productId && ct.varients === varientId && ct.colors === colorId});
    const existingItem = cart.cart_item.find((ct: any) => {
      if (varientId && colorId) {
        // Both variant and color are provided
        return ct.product === productId && ct.varients === varientId && ct.colors === colorId;
      } else if (varientId) {
        // Only variant is provided
        return ct.product === productId && ct.varients === varientId ;
      } else if (colorId) {
        // Only color is provided
        return ct.product === productId && ct.colors === colorId;
      } else {
        // Neither variant nor color is provided
        return ct.product === productId;
        
      }
    });
    
    
    let cartItem: RecordModel;
    if (existingItem === undefined) {
      // Create a new cart item
    console.log('I was called true')

      cartItem = await createCartItem({
        quantity,
        price,
        product: productId,
        varients: varientId,
        colors: colorId,
        selected_varient_name,
        selected_color_name
      });
    } else {
    console.log('I was called false')

      // Update existing cart item
      cartItem = existingItem;
    console.log('colorID==========', colorId);
    console.log(' vARIENT==========', varientId);
      cartItem.quantity += quantity;
    console.log('I was called false', cartItem);

      await updateCartItemById(cartItem.id, {
        quantity: cartItem.quantity,
      });
    }

    // Add the cart item to the cart if it's new
    // this is the probs
    if (cart!.cart_item.find((ct: any) => ct.id === cartItem.id) === undefined) {
      cart.cart_item.push(cartItem);
      await updateCartById(cart.id, {
        cart_item: cart!.cart_item.map((ct: any) => ct.id),
      });
    }

    // Recalculate total
  
    // Update cart total
    await recalculateCartTotal(cart.id)
    
    // Revalidate the cart page to reflect changes
    // revalidatePath('/cart');
    
    return { success: true, message: 'Item added to cart successfully' };
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return { success: false, message: 'Failed to add item to cart' };
  }
}


