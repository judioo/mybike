import { Product } from '@/types/product';
import ProductGridSection from '@/components/product/ProductGridSection';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
  limit?: number;
  showViewAll?: boolean;
  templateSuffix?: string;
  className?: string;
}

export default function RelatedProducts({
  products,
  title = 'Related Products',
  description = 'Products similar to what you\'re viewing',
  viewAllLink,
  viewAllText,
  limit = 4,
  showViewAll = false,
  templateSuffix = '',
  className = '',
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <ProductGridSection
      products={products}
      title={title}
      description={description}
      viewAllLink={viewAllLink}
      viewAllText={viewAllText}
      limit={limit}
      showViewAll={showViewAll && !!viewAllLink}
      templateSuffix={templateSuffix}
      className={className}
    />
  );
}

// Add a skeleton loader component
RelatedProducts.Skeleton = function Skeleton() {
  return <ProductGridSection.Skeleton />;
};
