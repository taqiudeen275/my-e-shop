"use server"

import pb from "@/lib/pocketbase_client"
import { cookies } from "next/headers"


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
  

async function deleteRecord(collectionName: string, record_id:string) {
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
      color: [],
    },
    categories: {
      products:[]
    }
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
    const items = await relatedCollection.getFullList({ filter: `id ~ "${idsArray.join('","')}"` })
  
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
  export const getOrderItems = (preloads: string[] = [], filterQuery?: string) => fetchCollectionWithNestedPreload('order_items', preloads, filterQuery)
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
export const getOrderItemById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('order_items', id, preloads)
export const getProductById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('products', id, preloads)
export const getReviewById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('review', id, preloads)
export const getVariantById = (id: string, preloads: string[] = []) => fetchItemWithNestedPreload('varients', id, preloads)


// delete operation
// Only kept delete operations for what users can do but the admin have access to everything at the admin dashboard
export const deleteAddressById = (id: string) => deleteRecord('address', id)
export const deleteOrderById = (id: string) => deleteRecord('order', id)
export const deleteOrderItemById = (id: string) => deleteRecord('order_items', id)
export const deleteReviewById = (id: string) => deleteRecord('review', id)

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

// Add/Create Operations
export const createReview = (record: any) => createRecord('review', record)
export const createOrder = (record: any) => createRecord('order', record)
export const createAddress = (record: any) => createRecord('address', record)
export const createOrderItem = (record: any) => createRecord('order_items', record)


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
