// utils/cart.ts

export interface CartItemProp {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    varient?: string;
  }
  
  const isClient = typeof window !== 'undefined';
  // Helper function to get the current cart
  export const getCart = (): CartItemProp[] => {
    if (!isClient) return [];
    return JSON.parse(localStorage.getItem('cart') || '[]');
  };
  
  // Helper function to save the cart
  const saveCart = (cart: CartItemProp[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const addToCart = (item: CartItemProp) => {
    if (!isClient) return;
  const cart = getCart();
  const existingItem = cart.find(i => i.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  saveCart(cart);
  };
  
  export const changeCartQuantity = (item: CartItemProp) => {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity = item.quantity;
    } 
    
    saveCart(cart);
  };

  export const removeFromCart = (itemId: string) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    saveCart(updatedCart);
  };
 
  
  export const getCartItems = (): CartItemProp[] => {
    return getCart();
  };
  
  export const clearCart = () => {
    localStorage.removeItem('cart');
  };