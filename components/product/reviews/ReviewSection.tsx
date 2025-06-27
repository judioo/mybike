import React, { useState } from 'react';
import { Review } from '@/types/product';
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
  productId: string;
  productTitle: string;
  initialLimit?: number;
}

export default function ReviewSection({ 
  reviews, 
  productId,
  productTitle,
  initialLimit = 5 
}: ReviewSectionProps) {
  const [displayLimit, setDisplayLimit] = useState(initialLimit);
  const [sortOption, setSortOption] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  
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

  return (
    <div className="mt-16 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Review Summary */}
        <div className="lg:col-span-1">
          <ReviewSummary reviews={reviews} productId={productId} />
        </div>
        
        {/* Review List */}
        <div className="lg:col-span-3">
          {/* Sorting and filtering controls */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <button
                onClick={() => handleFilterChange(null)}
                className={`px-3 py-1 text-sm rounded-full ${
                  filterRating === null
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange(rating)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filterRating === rating
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {rating} ★
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sort-reviews" className="text-sm text-gray-600 mr-2">
                Sort by:
              </label>
              <select
                id="sort-reviews"
                value={sortOption}
                onChange={handleSortChange}
                className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>
          
          {/* Reviews count */}
          <div className="mb-4 text-sm text-gray-500">
            Showing {displayedReviews.length} of {sortedAndFilteredReviews.length} reviews
            {filterRating !== null && ` with ${filterRating} stars`}
          </div>
          
          {/* Review Form */}
          {showReviewForm && (
            <ReviewForm 
              productId={productId} 
              productTitle={productTitle} 
              onReviewSubmitted={handleReviewSubmitted} 
            />
          )}
          
          {/* Reviews list */}
          <ReviewList reviews={displayedReviews} productId={productId} />
          
          {/* Load more button */}
          {hasMoreReviews && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
