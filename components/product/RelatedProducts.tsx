import { Product } from '@/types/product';
import ProductGrid from '@/components/catalog/ProductGrid';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = 'Related Products',
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className='mt-16'>
      <h2 className='text-2xl font-bold text-gray-900 mb-8'>{title}</h2>
      <ProductGrid products={products.slice(0, 4)} />
    </div>
  );
}
