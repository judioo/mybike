import React, { Suspense } from 'react';
import { Product } from '@/types/product';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductSpecs from '@/components/product/ProductSpecs';
import RecentlyViewedProducts from '@/components/product/RecentlyViewedProducts';
import RelatedProducts from '@/components/product/RelatedProducts';
import RichMediaRenderer from '@/components/product/RichMediaRenderer';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import ReviewSection for better performance
const ReviewSection = dynamic(
  () => import('@/components/product/reviews/ReviewSection'),
  {
    loading: () => <div className="mt-16 border-t border-gray-200 pt-8 animate-pulse bg-gray-100 h-64 w-full rounded-lg"></div>,
    ssr: true
  }
);

interface ServiceProductTemplateProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ServiceProductTemplate({ product, relatedProducts }: ServiceProductTemplateProps) {
  // Detect if product has rich media (videos, 3D models)
  const hasRichMedia = product.metafields?.richMedia || 
    (product.metafields?.mediaType && product.metafields.mediaType !== 'image');
  
  // Process rich media if available
  const richMedia = hasRichMedia ? processRichMedia(product) : null;
  
  // Extract service-specific details
  const serviceDetails = extractServiceDetails(product);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link href="/collections/services" className="ml-4 text-gray-400 hover:text-gray-500">
                  Services
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-4 text-gray-500 font-medium">
                  {product.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Service Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Service Package
          </span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images and Media */}
          <div>
            {richMedia ? (
              <div className="mb-4">
                <RichMediaRenderer media={richMedia} className="w-full aspect-video" />
              </div>
            ) : null}
            <ProductImageGallery
              images={product.images}
              productTitle={product.title}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>

              {/* Price and Availability */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline">
                  <p className="text-3xl tracking-tight text-gray-900">
                    ${product.price}
                  </p>
                  {product.compareAtPrice &&
                    product.compareAtPrice > product.price && (
                      <span className="ml-3 text-lg text-gray-500 line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  {product.compareAtPrice &&
                    typeof product.compareAtPrice === 'number' &&
                    typeof product.price === 'number' &&
                    product.compareAtPrice > product.price && (
                      <span className="ml-3 text-sm font-medium text-green-600">
                        Save $
                        {(product.compareAtPrice - product.price).toFixed(2)}
                      </span>
                    )}
                </div>

                {/* Availability */}
                <div className="flex items-center">
                  {product.available !== false ? (
                    <span className="flex items-center text-sm font-medium text-green-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Available
                    </span>
                  ) : (
                    <span className="flex items-center text-sm font-medium text-red-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Service Duration */}
            {serviceDetails.duration && (
              <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Duration: {serviceDetails.duration}</span>
              </div>
            )}

            {/* Service Description */}
            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <div className="mt-4 prose prose-sm text-gray-500" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>

            {/* Customer Reviews */}
            <Suspense fallback={<div className="mt-16 border-t border-gray-200 pt-8 animate-pulse bg-gray-100 h-64 w-full rounded-lg"></div>}>
              {product.reviews && product.reviews.length > 0 && (
                <ReviewSection 
                  reviews={product.reviews} 
                  productId={product.id.toString()}
                  productTitle={product.title}
                  initialLimit={5} 
                />
              )}
            </Suspense>

            {/* Service Includes */}
            {serviceDetails.includes && serviceDetails.includes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  This Service Includes
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {serviceDetails.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Book Service Button */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Book This Service
              </h3>
              <AddToCartButton
                product={product}
                variant={product.variants?.[0]}
                buttonText="Book Now"
              />
            </div>

            {/* Service Location */}
            {serviceDetails.location && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Service Location
                </h3>
                <p className="text-sm text-gray-600">{serviceDetails.location}</p>
              </div>
            )}

            {/* Cancellation Policy */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Cancellation Policy
              </h3>
              <p className="text-sm text-gray-600">
                {serviceDetails.cancellationPolicy || 
                  "Free cancellation up to 24 hours before your scheduled appointment. Late cancellations may be subject to a fee."}
              </p>
            </div>
          </div>
        </div>

        {/* Service Process */}
        {serviceDetails.process && serviceDetails.process.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceDetails.process.map((step, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {serviceDetails.faqs && serviceDetails.faqs.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {serviceDetails.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        <div className="mt-16">
          <RecentlyViewedProducts
            currentProductId={product.id}
            maxItems={6}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to process rich media from product metadata
function processRichMedia(product: Product) {
  const { metafields } = product;
  
  if (!metafields) return null;
  
  // Handle video
  if (metafields.videoUrl) {
    if (metafields.videoUrl.includes('youtube.com') || metafields.videoUrl.includes('youtu.be')) {
      // Extract YouTube video ID
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = metafields.videoUrl.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : '';
      
      return {
        type: 'youtube' as const,
        src: metafields.videoUrl,
        id: videoId,
      };
    } else if (metafields.videoUrl.includes('vimeo.com')) {
      // Extract Vimeo video ID
      const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
      const match = metafields.videoUrl.match(regExp);
      const videoId = match ? match[3] : '';
      
      return {
        type: 'vimeo' as const,
        src: metafields.videoUrl,
        id: videoId,
      };
    } else {
      // Regular video
      return {
        type: 'video' as const,
        src: metafields.videoUrl,
        poster: metafields.videoPoster || product.images?.[0]?.src,
        autoplay: metafields.videoAutoplay === 'true',
        loop: metafields.videoLoop === 'true',
        muted: true,
        controls: true,
      };
    }
  }
  
  return null;
}

// Helper function to extract service-specific details
function extractServiceDetails(product: Product) {
  const { metafields } = product;
  
  // Extract service includes from metafields or description
  let includes: string[] = [];
  
  if (metafields?.serviceIncludes) {
    // If includes are stored as a string, split by newlines or semicolons
    if (typeof metafields.serviceIncludes === 'string') {
      includes = metafields.serviceIncludes
        .split(/[\n;]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    } 
    // If includes are stored as an array
    else if (Array.isArray(metafields.serviceIncludes)) {
      includes = metafields.serviceIncludes;
    }
  }
  
  // Extract service process steps
  let process: Array<{title: string, description: string}> = [];
  
  if (metafields?.serviceProcess) {
    try {
      // Try to parse as JSON if it's a string
      if (typeof metafields.serviceProcess === 'string') {
        process = JSON.parse(metafields.serviceProcess);
      } 
      // Use directly if it's already an array
      else if (Array.isArray(metafields.serviceProcess)) {
        process = metafields.serviceProcess;
      }
    } catch (e) {
      // If parsing fails, create a default process
      process = [
        {
          title: 'Book',
          description: 'Select your preferred date and time for the service.'
        },
        {
          title: 'Confirm',
          description: 'We\'ll confirm your booking and provide any pre-service instructions.'
        },
        {
          title: 'Service',
          description: 'Our professional technicians will perform the service to the highest standards.'
        }
      ];
    }
  }
  
  // Extract FAQs
  let faqs: Array<{question: string, answer: string}> = [];
  
  if (metafields?.serviceFaqs) {
    try {
      // Try to parse as JSON if it's a string
      if (typeof metafields.serviceFaqs === 'string') {
        faqs = JSON.parse(metafields.serviceFaqs);
      } 
      // Use directly if it's already an array
      else if (Array.isArray(metafields.serviceFaqs)) {
        faqs = metafields.serviceFaqs;
      }
    } catch (e) {
      // If parsing fails, create default FAQs
      faqs = [
        {
          question: 'How long does this service take?',
          answer: metafields?.duration ? `This service typically takes ${metafields.duration}.` : 'Service time varies depending on your bike\'s condition and specific requirements.'
        },
        {
          question: 'Do I need to bring anything?',
          answer: 'Just bring your bike and any specific parts you want installed. We provide all tools and standard consumables.'
        }
      ];
    }
  }
  
  return {
    duration: metafields?.duration || metafields?.serviceDuration,
    includes,
    location: metafields?.serviceLocation || 'In-store at MyBike Shop',
    cancellationPolicy: metafields?.cancellationPolicy,
    process,
    faqs,
  };
}
