import React, { createContext, useContext, useReducer } from 'react';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  total: 0
};

const CartContext = createContext<CartContextType>({
  state: initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {}
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.productId === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }

      return {
        ...state,
        items: [...state.items, {
          id: Date.now(),
          productId: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          image: action.payload.image
        }],
        total: state.total + action.payload.price
      };
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.productId === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload),
        total: state.total - (item ? item.price * item.quantity : 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (!item) return state;

      if (action.payload.quantity === 0) {
        return {
          ...state,
          items: state.items.filter(i => i.productId !== action.payload.productId),
          total: state.total - (item.price * item.quantity)
        };
      }

      const quantityDiff = action.payload.quantity - item.quantity;
      
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff)
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = {
    state,
    addToCart: (product: Product) => {
      dispatch({ type: 'ADD_ITEM', payload: product });
    },
    removeFromCart: (productId: number) => {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    },
    updateQuantity: (productId: number, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    },
    clearCart: () => {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}