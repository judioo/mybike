import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant } from '@/types/product';

// Cart item type extending product with cart-specific fields
export interface CartItem {
  id: string; // Unique cart item ID (product_id + variant_id)
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  addedAt: Date;
}

// Cart store state interface
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;

  // Actions
  addItem: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (
    productId: string | number,
    variantId?: string | number
  ) => number;
}

// Generate unique cart item ID
const generateCartItemId = (
  productId: string | number,
  variantId?: string | number
): string => {
  return `${productId}_${variantId || 'default'}`;
};

// Create the cart store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      addItem: (product: Product, variant?: ProductVariant, quantity = 1) => {
        const itemId = generateCartItemId(product.id, variant?.id);
        const existingItem = get().items.find((item) => item.id === itemId);

        if (existingItem) {
          // Update quantity if item already exists
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }));
        } else {
          // Add new item
          const newItem: CartItem = {
            id: itemId,
            product,
            variant,
            quantity,
            addedAt: new Date(),
          };

          set((state) => ({
            items: [...state.items, newItem],
          }));
        }
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const priceString = item.variant?.price || item.product.price;
          const price = parseFloat(priceString.replace(/[^0-9.-]+/g, '')) || 0;
          return total + price * item.quantity;
        }, 0);
      },

      getItemCount: (
        productId: string | number,
        variantId?: string | number
      ) => {
        const itemId = generateCartItemId(productId, variantId);
        const item = get().items.find((item) => item.id === itemId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'mybike-cart', // localStorage key
      partialize: (state) => ({
        items: state.items,
        // Don't persist UI state like isOpen
      }),
    }
  )
);
