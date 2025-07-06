import React from 'react';
import { Review } from '@/types/product';
import ReviewStar from './ReviewStar';

interface ReviewSummaryProps {
  reviews: Review[];
  productId: string;
  onWriteReviewClick?: () => void;
}

export default function ReviewSummary({ reviews, productId, onWriteReviewClick }: ReviewSummaryProps) {
  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // 5 stars, 4 stars, 3 stars, 2 stars, 1 star
  
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++;
    }
  });
  
  // Calculate percentages for rating bars
  const ratingPercentages = ratingCounts.map(count => 
    reviews.length > 0 ? (count / reviews.length) * 100 : 0
  );

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
      
      <div className="mt-4 flex items-center">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <ReviewStar key={star} filled={star <= Math.round(averageRating)} size="lg" />
          ))}
        </div>
        <p className="ml-2 text-sm text-gray-700">
          Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </p>
      </div>
      
      {reviews.length > 0 ? (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900">Rating Distribution</h4>
          <div className="mt-2 space-y-3">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center text-sm">
                <div className="w-14 text-gray-600">{rating} stars</div>
                <div className="w-full ml-4 mr-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{ width: `${ratingPercentages[index]}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-9 text-right text-gray-500">
                  {ratingCounts[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          This product has no reviews yet. Be the first to leave a review!
        </p>
      )}
      
      <div className="mt-6">
        <button
          type="button"
          onClick={onWriteReviewClick}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          aria-label="Write a review"
        >
          Write a Review
        </button>
      </div>
    </div>
  );
}

// Skeleton loading state
ReviewSummary.Skeleton = function ReviewSummarySkeleton() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
      
      <div className="mt-4 flex items-center">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-5 h-5 bg-gray-200 rounded mr-1 animate-pulse"></div>
          ))}
        </div>
        <div className="ml-2 h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
      
      <div className="mt-6">
        <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
        <div className="mt-2 space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <div className="w-14 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full ml-4 mr-2">
                <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="w-9 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <div className="h-9 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
};
