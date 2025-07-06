import React, { useState, useEffect } from 'react';
import { Review, Product } from '@/types/product';
import ReviewSummary from './ReviewSummary';
import ReviewList from './ReviewList';
import dynamic from 'next/dynamic';

// Import the skeleton directly to avoid circular reference
import { Skeleton as ReviewFormSkeleton } from './ReviewForm';

const ReviewForm = dynamic(() => import('./ReviewForm'), {
  ssr: false,
  loading: () => <ReviewFormSkeleton />
});

interface ReviewSectionProps {
  reviews: Review[];
  product: Product;
  initialLimit?: number;
  templateSuffix?: string;
}

export default function ReviewSection({ 
  reviews, 
  product,
  initialLimit = 5,
  templateSuffix = ''
}: ReviewSectionProps) {
  const [displayLimit, setDisplayLimit] = useState(initialLimit);
  const [sortOption, setSortOption] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    verifiedCount: 0,
    withImagesCount: 0
  });
  
  // Calculate review statistics
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const verifiedCount = reviews.filter(review => review.verified).length;
      const withImagesCount = reviews.filter(review => review.images && review.images.length > 0).length;
      
      setReviewStats({
        averageRating: totalRating / reviews.length,
        totalReviews: reviews.length,
        verifiedCount,
        withImagesCount
      });
    }
  }, [reviews]);
  
  // Sort and filter reviews
  const sortedAndFilteredReviews = [...reviews]
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === 'highest') {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });
  
  const displayedReviews = sortedAndFilteredReviews.slice(0, displayLimit);
  const hasMoreReviews = displayLimit < sortedAndFilteredReviews.length;
  
  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + initialLimit);
  };
  
  const handleFilterChange = (rating: number | null) => {
    setFilterRating(rating);
    setDisplayLimit(initialLimit); // Reset display limit when filter changes
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as 'newest' | 'highest' | 'lowest');
    setDisplayLimit(initialLimit); // Reset display limit when sort changes
  };
  
  const handleReviewSubmitted = () => {
    // In a real app, we would refetch reviews here
    setShowReviewForm(false);
  };

  // Apply template-specific styling
  const getTemplateClass = () => {
    switch (templateSuffix) {
      case 'bike':
      case 'bicycle':
      case 'mountain-bike':
      case 'road-bike':
        return 'bg-gradient-to-r from-blue-50 to-white';
      case 'accessory':
      case 'component':
      case 'part':
        return 'bg-gradient-to-r from-gray-50 to-white';
      case 'preloved':
      case 'used':
      case 'second-hand':
        return 'bg-gradient-to-r from-amber-50 to-white';
      case 'service':
      case 'repair':
      case 'maintenance':
        return 'bg-gradient-to-r from-green-50 to-white';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`mt-16 border-t border-gray-200 pt-8 rounded-lg ${getTemplateClass()}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
      
      {/* Review stats summary */}
      <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-500">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 mr-1">{reviewStats.averageRating.toFixed(1)}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className={`w-4 h-4 ${star <= Math.round(reviewStats.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-1">({reviewStats.totalReviews} {reviewStats.totalReviews === 1 ? 'review' : 'reviews'})</span>
        </div>
        
        {reviewStats.verifiedCount > 0 && (
          <div className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{reviewStats.verifiedCount} verified {reviewStats.verifiedCount === 1 ? 'purchase' : 'purchases'}</span>
          </div>
        )}
        
        {reviewStats.withImagesCount > 0 && (
          <div className="flex items-center">
            <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{reviewStats.withImagesCount} with {reviewStats.withImagesCount === 1 ? 'photo' : 'photos'}</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Review Summary */}
        <div className="lg:col-span-1">
          <ReviewSummary 
            reviews={reviews} 
            productId={product.id.toString()} 
            onWriteReviewClick={() => setShowReviewForm(true)}
          />
        </div>
        
        {/* Review List */}
        <div className="lg:col-span-3">
          {/* Sorting and filtering controls */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              <button
                onClick={() => handleFilterChange(null)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filterRating === null
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                aria-label="Show all reviews"
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange(rating)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    filterRating === rating
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  aria-label={`Filter by ${rating} star reviews`}
                >
                  {rating} <span className="text-yellow-500">★</span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <label htmlFor="sort-reviews" className="text-sm text-gray-600 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort-reviews"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Sort reviews"
                >
                  <option value="newest">Newest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                aria-label={showReviewForm ? "Cancel writing review" : "Write a review"}
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>
          </div>
          
          {/* Reviews count */}
          <div className="mb-4 text-sm text-gray-500">
            Showing {displayedReviews.length} of {sortedAndFilteredReviews.length} reviews
            {filterRating !== null && ` with ${filterRating} stars`}
          </div>
          
          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
              <ReviewForm 
                productId={product.id.toString()} 
                productTitle={product.title} 
                onReviewSubmitted={handleReviewSubmitted} 
              />
            </div>
          )}
          
          {/* Reviews list */}
          {displayedReviews.length > 0 ? (
            <ReviewList reviews={displayedReviews} productId={product.id.toString()} />
          ) : (
            <div className="py-12 text-center bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Be the first to review {product.title}
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Write a Review
                </button>
              </div>
            </div>
          )}
          
          {/* Load more button */}
          {hasMoreReviews && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                aria-label="Load more reviews"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton loading state
ReviewSection.Skeleton = function ReviewSectionSkeleton() {
  return (
    <div className="mt-16 border-t border-gray-200 pt-8">
      <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-6"></div>
      
      <div className="flex flex-wrap items-center gap-6 mb-6">
        <div className="h-5 bg-gray-200 rounded w-36 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Review Summary Skeleton */}
        <div className="lg:col-span-1">
          <ReviewSummary.Skeleton />
        </div>
        
        {/* Review List Skeleton */}
        <div className="lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-12 animate-pulse"></div>
              ))}
            </div>
            <div className="h-8 bg-gray-200 rounded w-36 animate-pulse"></div>
          </div>
          
          <div className="mb-4 h-4 bg-gray-200 rounded w-60 animate-pulse"></div>
          
          <ReviewList.Skeleton />
        </div>
      </div>
    </div>
  );
};
