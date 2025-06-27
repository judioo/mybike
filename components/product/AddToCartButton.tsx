'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types/product';
import { useCartStore, useUIStore, showSuccess } from '@/lib/stores';

interface AddToCartButtonProps {
  product: Product;
  variant?: ProductVariant;
  quantity?: number;
  className?: string;
  disabled?: boolean;
  buttonText?: string;
}

export default function AddToCartButton({
  product,
  variant,
  quantity = 1,
  className = '',
  disabled = false,
  buttonText = 'Add to Cart',
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const { setLoading } = useUIStore();

  // Get current quantity in cart
  const currentQuantity = getItemCount(product.id, variant?.id);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      setLoading('cart', true);

      // Add item to cart
      addItem(product, variant, quantity);

      // Show success notification
      const productName = variant
        ? `${product.title} (${variant.title})`
        : product.title;

      showSuccess(
        'Added to cart!',
        `${productName} has been added to your cart.`,
        3000
      );

      // Optionally open cart sidebar for immediate feedback
      // openCart();
    } catch (error) {
      useUIStore.getState().addNotification({
        type: 'error',
        title: 'Failed to add item',
        message: 'Please try again.',
        duration: 4000,
      });
    } finally {
      setIsAdding(false);
      setLoading('cart', false);
    }
  };

  // Determine button text based on state
  const getButtonText = () => {
    if (isAdding) return 'Adding...';
    if (currentQuantity > 0) return `Add to Cart (${currentQuantity} in cart)`;
    return 'Add to Cart';
  };

  const isDisabled = disabled || isAdding || !product.available;

  return (
    <button
      type="button"
      className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ${className} ${
        disabled || isAdding ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || isAdding}
      onClick={handleAddToCart}
      aria-label={`Add ${product.title} to cart`}
    >
      {isAdding ? 'Adding...' : buttonText}
    </button>
  );
}
