interface Metafield {
  id: string;
  key: string;
  value: string;
  type: string;
  namespace?: string;
}

interface ProductSpecsProps {
  metafields?: Metafield[];
  product?: {
    vendor?: string;
    productType?: string;
    weight?: number;
    tags?: string[];
    handle?: string;
    createdAt?: string;
  };
}

export default function ProductSpecs({
  metafields,
  product,
}: ProductSpecsProps) {
  // Combine metafields with basic product info
  const specs: Array<{ key: string; value: string; category?: string }> = [];

  // Add basic product information
  if (product) {
    if (product.vendor) {
      specs.push({ key: 'Brand', value: product.vendor, category: 'General' });
    }
    if (product.productType) {
      specs.push({
        key: 'Type',
        value: product.productType,
        category: 'General',
      });
    }
    if (product.weight) {
      specs.push({
        key: 'Weight',
        value: `${product.weight} lbs`,
        category: 'Technical',
      });
    }
    if (product.tags && product.tags.length > 0) {
      specs.push({
        key: 'Features',
        value: product.tags.join(', '),
        category: 'Features',
      });
    }
  }

  // Add metafields with organized display
  if (metafields && metafields.length > 0) {
    metafields.forEach((metafield) => {
      const displayKey = metafield.key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      let displayValue = metafield.value;

      // Format specific types
      if (metafield.type === 'measurement.weight') {
        displayValue = `${metafield.value} lbs`;
      } else if (metafield.type === 'measurement.dimension') {
        displayValue = `${metafield.value} inches`;
      } else if (metafield.type === 'color') {
        displayValue =
          metafield.value.charAt(0).toUpperCase() + metafield.value.slice(1);
      }

      specs.push({
        key: displayKey,
        value: displayValue,
        category: metafield.namespace || 'Technical',
      });
    });
  }

  if (specs.length === 0) {
    return null;
  }

  // Group specs by category
  const groupedSpecs = specs.reduce(
    (groups, spec) => {
      const category = spec.category || 'General';
      if (!groups[category]) groups[category] = [];
      groups[category].push(spec);
      return groups;
    },
    {} as Record<string, typeof specs>
  );

  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-medium text-gray-900'>Specifications</h3>

      {Object.entries(groupedSpecs).map(([category, categorySpecs]) => (
        <div key={category} className='space-y-3'>
          {Object.keys(groupedSpecs).length > 1 && (
            <h4 className='text-sm font-medium text-gray-700 uppercase tracking-wide'>
              {category}
            </h4>
          )}

          <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3'>
            {categorySpecs.map((spec, index) => (
              <div key={index} className='border-b border-gray-100 pb-2'>
                <dt className='text-sm font-medium text-gray-500'>
                  {spec.key}
                </dt>
                <dd className='text-sm text-gray-900 mt-1'>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
