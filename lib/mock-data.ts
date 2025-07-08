import { Product, Collection, ProductImage } from '@/types/product';

// Mock product images
const MOCK_IMAGES: ProductImage[] = [
  { src: 'https://example.com/images/bikes/road-bike-1.jpg', alt: 'Road bike front view' },
  { src: 'https://example.com/images/bikes/road-bike-2.jpg', alt: 'Road bike side view' },
  { src: 'https://example.com/images/bikes/mountain-bike-1.jpg', alt: 'Mountain bike on trail' },
  { src: 'https://example.com/images/bikes/mountain-bike-2.jpg', alt: 'Mountain bike detail' },
  { src: 'https://example.com/images/bikes/hybrid-bike-1.jpg', alt: 'Hybrid bike in city' },
  { src: 'https://example.com/images/bikes/electric-bike-1.jpg', alt: 'Electric bike charging' },
];

// Mountain Trail Explorer specific images (from the original mock product JSON)
const MOUNTAIN_EXPLORER_IMAGES: ProductImage[] = [
  { 
    id: "img1",
    src: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80", 
    alt: "Mountain Explorer Pro - Red" 
  },
  { 
    id: "img2",
    src: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80", 
    alt: "Mountain Explorer Pro - Blue" 
  },
  { 
    id: "img3",
    src: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80", 
    alt: "Mountain Explorer Pro - Black" 
  }
];

// Mock collections
export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 281610289213,
    title: 'Road Bikes',
    handle: 'road-bikes',
    description:
      'High-performance road bikes for racing and long-distance cycling',
    published: true,
    sortOrder: 'manual',
  },
  {
    id: 281610289214,
    title: 'Mountain Bikes',
    handle: 'mountain-bikes',
    description: 'Rugged mountain bikes built for off-road adventures',
    published: true,
    sortOrder: 'manual',
  },
  {
    id: 281610289215,
    title: 'Hybrid Bikes',
    handle: 'hybrid-bikes',
    description:
      'Versatile hybrid bikes perfect for city commuting and leisure rides',
    published: true,
    sortOrder: 'manual',
  },
  {
    id: 281610289216,
    title: 'Electric Bikes',
    handle: 'electric-bikes',
    description: 'Electric bikes with advanced battery technology',
    published: true,
    sortOrder: 'manual',
  },
  {
    id: 281610289217,
    title: 'Kids Bikes',
    handle: 'kids-bikes',
    description: 'Safe and fun bikes designed specifically for children',
    published: true,
    sortOrder: 'manual',
  },
  {
    id: 281610289218,
    title: 'Accessories',
    handle: 'accessories',
    description: 'Essential cycling accessories and gear',
    published: true,
    sortOrder: 'manual',
  },
];

// Mock products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Carbon Pro Road Bike',
    handle: 'carbon-pro-road-bike',
    description:
      'Lightweight carbon fiber road bike designed for competitive racing. Features aerodynamic frame geometry and high-performance components.',
    images: [MOCK_IMAGES[0], MOCK_IMAGES[1]],
    variants: [
      {
        id: 101,
        title: 'Red / Medium',
        sku: 'CPR-RED-M',
        price: '12000.00',
        compareAtPrice: '14000.00',
        available: true,
        optionValues: ['Red', 'Medium'],
      },
      {
        id: 102,
        title: 'Red / Large',
        sku: 'CPR-RED-L',
        price: '12000.00',
        compareAtPrice: '14000.00',
        available: true,
        optionValues: ['Red', 'Large'],
      },
      {
        id: 103,
        title: 'Blue / Medium',
        sku: 'CPR-BLUE-M',
        price: '12000.00',
        available: false,
        optionValues: ['Blue', 'Medium'],
      },
    ],
    price: '12000.00',
    compareAtPrice: '14000.00',
    available: true,
    options: [
      { name: 'Color', values: ['Red', 'Blue'] },
      { name: 'Size', values: ['Medium', 'Large'] },
    ],
    tags: ['carbon', 'road', 'racing', 'lightweight', 'aerodynamic'],
    collections: [281610289213],
    metafields: {
      material: 'Carbon Fiber',
      speed: '22',
      weight: '7.5kg',
      brand: 'ProCycle',
    },
    vendor: 'ProCycle',
    productType: 'Road Bike',
    createdAt: '2024-01-15T10:00:00Z',
    seo: {
      title: 'Carbon Pro Road Bike - Lightweight Racing Bicycle',
      description:
        'Professional carbon fiber road bike for competitive cycling',
    },
  },
  {
    id: 2,
    title: 'Mountain Explorer Pro',
    handle: 'mountain-trail-explorer',
    description:
      'The Mountain Explorer Pro is our flagship mountain bike, designed for serious trail riders who demand the best in performance and durability. With advanced suspension, premium components, and a lightweight frame, this bike can handle any terrain with ease.',
    images: MOUNTAIN_EXPLORER_IMAGES,
    variants: [
      {
        id: "var1",
        title: "Mountain Explorer Pro - Red / Small / Carbon",
        price: "2199.00",
        compareAtPrice: "2499.00",
        sku: "MBK-MEP-R-S-C",
        available: true,
        optionValues: ["Red", "Small", "Carbon"],
        inventory: {
          quantity: 5,
          policy: "deny"
        }
      },
      {
        id: "var2",
        title: "Mountain Explorer Pro - Red / Medium / Carbon",
        price: "2199.00",
        compareAtPrice: "2499.00",
        sku: "MBK-MEP-R-M-C",
        available: true,
        optionValues: ["Red", "Medium", "Carbon"],
        inventory: {
          quantity: 3,
          policy: "deny"
        }
      },
      {
        id: "var3",
        title: "Mountain Explorer Pro - Red / Large / Carbon",
        price: "2199.00",
        compareAtPrice: "2499.00",
        sku: "MBK-MEP-R-L-C",
        available: true,
        optionValues: ["Red", "Large", "Carbon"],
        inventory: {
          quantity: 0,
          policy: "deny"
        }
      },
      {
        id: "var4",
        title: "Mountain Explorer Pro - Red / Small / Aluminum",
        price: "1899.00",
        compareAtPrice: "2199.00",
        sku: "MBK-MEP-R-S-A",
        available: true,
        optionValues: ["Red", "Small", "Aluminum"],
        inventory: {
          quantity: 8,
          policy: "deny"
        }
      },
      {
        id: "var5",
        title: "Mountain Explorer Pro - Red / Medium / Aluminum",
        price: "1899.00",
        compareAtPrice: "2199.00",
        sku: "MBK-MEP-R-M-A",
        available: true,
        optionValues: ["Red", "Medium", "Aluminum"],
        inventory: {
          quantity: 6,
          policy: "deny"
        }
      },
      {
        id: "var6",
        title: "Mountain Explorer Pro - Red / Large / Aluminum",
        price: "1899.00",
        compareAtPrice: "2199.00",
        sku: "MBK-MEP-R-L-A",
        available: true,
        optionValues: ["Red", "Large", "Aluminum"],
        inventory: {
          quantity: 4,
          policy: "deny"
        }
      },
      {
        id: "var7",
        title: "Mountain Explorer Pro - Blue / Small / Carbon",
        price: "2199.00",
        compareAtPrice: "2499.00",
        sku: "MBK-MEP-B-S-C",
        available: true,
        optionValues: ["Blue", "Small", "Carbon"],
        inventory: {
          quantity: 2,
          policy: "deny"
        }
      },
      {
        id: "var8",
        title: "Mountain Explorer Pro - Blue / Medium / Carbon",
        price: "2199.00",
        compareAtPrice: "2499.00",
        sku: "MBK-MEP-B-M-C",
        available: false,
        optionValues: ["Blue", "Medium", "Carbon"],
        inventory: {
          quantity: 0,
          policy: "deny"
        }
      },
      {
        id: "var13",
        title: "Mountain Explorer Pro - Black / Small / Carbon",
        price: "2199.00",
        compareAtPrice: "2499.00",
        sku: "MBK-MEP-BK-S-C",
        available: true,
        optionValues: ["Black", "Small", "Carbon"],
        inventory: {
          quantity: 3,
          policy: "deny"
        }
      }
    ],
    price: "2199.00",
    compareAtPrice: "2499.00",
    available: true,
    options: [
      {
        name: "Color",
        values: ["Red", "Blue", "Black"]
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"]
      },
      {
        name: "Frame Material",
        values: ["Carbon", "Aluminum"]
      }
    ],
    tags: ["mountain", "premium", "trail", "enduro"],
    collections: [281610289214],
    metafields: {
      material: "Carbon/Aluminum",
      speed: "21",
      weight: "11.2kg",
      brand: "MyBike"
    },
    vendor: "MyBike",
    productType: "Mountain Bike",
    createdAt: "2024-01-20T10:00:00Z",
    seo: {
      title: "Mountain Explorer Pro - Premium Trail Bike",
      description: "High-performance mountain bike for serious trail riders"
    },
  },
  {
    id: 3,
    title: 'City Commuter Hybrid',
    handle: 'city-commuter-hybrid',
    description:
      'Perfect hybrid bike for daily commuting and city riding. Comfortable upright position with practical features.',
    images: [MOCK_IMAGES[4]],
    variants: [
      {
        id: 301,
        title: 'Blue / Medium',
        sku: 'CCH-BLUE-M',
        price: '3500.00',
        available: true,
        optionValues: ['Blue', 'Medium'],
      },
      {
        id: 302,
        title: 'Silver / Medium',
        sku: 'CCH-SILVER-M',
        price: '3500.00',
        available: true,
        optionValues: ['Silver', 'Medium'],
      },
    ],
    price: '3500.00',
    available: true,
    options: [
      { name: 'Color', values: ['Blue', 'Silver'] },
      { name: 'Size', values: ['Medium', 'Large'] },
    ],
    tags: ['hybrid', 'commuter', 'city', 'comfortable', 'practical'],
    collections: [281610289215],
    metafields: {
      material: 'Steel',
      speed: '16',
      weight: '14kg',
      brand: 'UrbanRide',
    },
    vendor: 'UrbanRide',
    productType: 'Hybrid Bike',
    createdAt: '2024-02-01T10:00:00Z',
    seo: {
      title: 'City Commuter Hybrid - Urban Cycling Bike',
      description: 'Comfortable hybrid bike perfect for city commuting',
    },
  },
  {
    id: 4,
    title: 'Electric Power Cruiser',
    handle: 'electric-power-cruiser',
    description:
      'Advanced electric bike with long-range battery and powerful motor. Perfect for effortless commuting.',
    images: [MOCK_IMAGES[5]],
    variants: [
      {
        id: 401,
        title: 'White / Medium',
        sku: 'EPC-WHITE-M',
        price: '15500.00',
        available: true,
        optionValues: ['White', 'Medium'],
      },
      {
        id: 402,
        title: 'Black / Large',
        sku: 'EPC-BLACK-L',
        price: '15500.00',
        available: false,
        optionValues: ['Black', 'Large'],
      },
    ],
    price: '15500.00',
    available: true,
    options: [
      { name: 'Color', values: ['White', 'Black'] },
      { name: 'Size', values: ['Medium', 'Large'] },
    ],
    tags: ['electric', 'battery', 'motor', 'eco-friendly', 'modern'],
    collections: [281610289216],
    metafields: {
      material: 'Aluminum',
      speed: '25',
      weight: '22kg',
      brand: 'ElectricCycle',
      batteryRange: '80km',
    },
    vendor: 'ElectricCycle',
    productType: 'Electric Bike',
    createdAt: '2024-02-10T10:00:00Z',
    seo: {
      title: 'Electric Power Cruiser - Long Range E-Bike',
      description: 'Premium electric bike with 80km range',
    },
  },
  {
    id: 5,
    title: 'Professional Racing Bike',
    handle: 'professional-racing-bike',
    description:
      'Ultra-lightweight racing bike used by professional cyclists. Carbon fiber construction with aerodynamic design.',
    images: [MOCK_IMAGES[0]],
    variants: [
      {
        id: 501,
        title: 'Yellow / Large',
        sku: 'PRB-YELLOW-L',
        price: '18000.00',
        available: true,
        optionValues: ['Yellow', 'Large'],
      },
    ],
    price: '18000.00',
    available: true,
    options: [
      { name: 'Color', values: ['Yellow'] },
      { name: 'Size', values: ['Large'] },
    ],
    tags: ['carbon', 'racing', 'professional', 'ultra-light', 'competition'],
    collections: [281610289213],
    metafields: {
      material: 'Carbon Fiber',
      speed: '25',
      weight: '6.8kg',
      brand: 'ProCycle',
    },
    vendor: 'ProCycle',
    productType: 'Racing Bike',
    createdAt: '2024-02-15T10:00:00Z',
    seo: {
      title: 'Professional Racing Bike - Competition Grade',
      description: 'Ultra-lightweight carbon racing bike for professionals',
    },
  },
  {
    id: 6,
    title: 'Budget Road Bike',
    handle: 'budget-road-bike',
    description:
      'Affordable road bike perfect for beginners and casual riders. Great value for money.',
    images: [MOCK_IMAGES[1]],
    variants: [
      {
        id: 601,
        title: 'Red / Medium',
        sku: 'BRB-RED-M',
        price: '2500.00',
        available: true,
        optionValues: ['Red', 'Medium'],
      },
      {
        id: 602,
        title: 'Blue / Medium',
        sku: 'BRB-BLUE-M',
        price: '2500.00',
        available: true,
        optionValues: ['Blue', 'Medium'],
      },
    ],
    price: '2500.00',
    available: true,
    options: [
      { name: 'Color', values: ['Red', 'Blue'] },
      { name: 'Size', values: ['Medium'] },
    ],
    tags: ['road', 'budget', 'beginner', 'affordable', 'steel'],
    collections: [281610289213],
    metafields: {
      material: 'Steel',
      speed: '14',
      weight: '12kg',
      brand: 'ValueCycle',
    },
    vendor: 'ValueCycle',
    productType: 'Road Bike',
    createdAt: '2024-02-20T10:00:00Z',
    seo: {
      title: 'Budget Road Bike - Affordable Cycling',
      description: 'Great value road bike for beginners',
    },
  },
  {
    id: 7,
    title: 'Kids Adventure Bike',
    handle: 'kids-adventure-bike',
    description:
      'Safe and fun bike designed for children aged 8-12. Bright colors and safety features included.',
    images: [MOCK_IMAGES[2]],
    variants: [
      {
        id: 701,
        title: 'Pink / 20 inch',
        sku: 'KAB-PINK-20',
        price: '1200.00',
        available: true,
        optionValues: ['Pink', '20 inch'],
      },
      {
        id: 702,
        title: 'Blue / 20 inch',
        sku: 'KAB-BLUE-20',
        price: '1200.00',
        available: true,
        optionValues: ['Blue', '20 inch'],
      },
    ],
    price: '1200.00',
    available: true,
    options: [
      { name: 'Color', values: ['Pink', 'Blue'] },
      { name: 'Size', values: ['20 inch'] },
    ],
    tags: ['kids', 'children', 'safe', 'fun', 'colorful'],
    collections: [281610289217],
    metafields: {
      material: 'Steel',
      speed: '7',
      weight: '8kg',
      brand: 'KidsCycle',
      ageRange: '8-12 years',
    },
    vendor: 'KidsCycle',
    productType: 'Kids Bike',
    createdAt: '2024-02-25T10:00:00Z',
    seo: {
      title: "Kids Adventure Bike - Safe Children's Bicycle",
      description: 'Fun and safe bike designed for children',
    },
  },
  {
    id: 8,
    title: 'Premium Helmet',
    handle: 'premium-helmet',
    description:
      'High-quality cycling helmet with advanced safety features and comfortable fit.',
    images: [MOCK_IMAGES[0]],
    variants: [
      {
        id: 801,
        title: 'Black / Medium',
        sku: 'PH-BLACK-M',
        price: '450.00',
        available: true,
        optionValues: ['Black', 'Medium'],
      },
      {
        id: 802,
        title: 'White / Medium',
        sku: 'PH-WHITE-M',
        price: '450.00',
        available: true,
        optionValues: ['White', 'Medium'],
      },
    ],
    price: '450.00',
    available: true,
    options: [
      { name: 'Color', values: ['Black', 'White'] },
      { name: 'Size', values: ['Small', 'Medium', 'Large'] },
    ],
    tags: ['helmet', 'safety', 'protection', 'comfortable', 'certified'],
    collections: [281610289218],
    metafields: {
      material: 'Polycarbonate',
      brand: 'SafetyFirst',
      certification: 'CE certified',
    },
    vendor: 'SafetyFirst',
    productType: 'Helmet',
    createdAt: '2024-03-01T10:00:00Z',
    seo: {
      title: 'Premium Cycling Helmet - Advanced Safety',
      description: 'Professional grade cycling helmet with CE certification',
    },
  },
];

// Function to get products by collection
export function getProductsByCollection(
  collectionId: string | number
): Product[] {
  return MOCK_PRODUCTS.filter((product) =>
    product.collections.includes(
      typeof collectionId === 'string' ? parseInt(collectionId) : collectionId
    )
  );
}

// Function to get a specific collection
export function getCollectionById(
  collectionId: string | number
): Collection | undefined {
  return MOCK_COLLECTIONS.find(
    (collection) =>
      collection.id ===
      (typeof collectionId === 'string' ? parseInt(collectionId) : collectionId)
  );
}

// Function to get a specific product
export function getProductById(
  productId: string | number
): Product | undefined {
  return MOCK_PRODUCTS.find(
    (product) =>
      product.id ===
      (typeof productId === 'string' ? parseInt(productId) : productId)
  );
}

// Function to get random products
export function getRandomProducts(count: number = 4): Product[] {
  const shuffled = [...MOCK_PRODUCTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get featured products
export function getFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter(
    (product) =>
      product.tags.includes('racing') ||
      product.tags.includes('professional') ||
      parseFloat(product.price) > 10000
  );
}

// Function to get products by price range
export function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number
): Product[] {
  return MOCK_PRODUCTS.filter((product) => {
    const price = parseFloat(product.price);
    return price >= minPrice && price <= maxPrice;
  });
}
