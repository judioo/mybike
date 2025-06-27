import React from 'react';
import { Review } from '@/types/product';
import ReviewStar from './ReviewStar';
import Image from 'next/image';

interface ReviewListProps {
  reviews: Review[];
  productId: string;
}

export default function ReviewList({ reviews, productId }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              {review.author.avatar ? (
                <Image
                  src={review.author.avatar}
                  alt={review.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {review.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{review.author.name}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <ReviewStar key={star} filled={star <= review.rating} />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {review.rating} out of 5 stars
                </span>
              </div>
              {review.title && (
                <h5 className="mt-2 font-medium text-gray-900">{review.title}</h5>
              )}
              <div className="mt-2 text-gray-600 text-sm whitespace-pre-line">
                {review.content}
              </div>
              {review.images && review.images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {review.images.map((image, index) => (
                    <div key={index} className="relative w-16 h-16">
                      <Image
                        src={image}
                        alt={`Review image ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
              {review.verified && (
                <div className="mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 text-green-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs text-green-600">Verified Purchase</span>
                </div>
              )}
              {review.helpful && review.helpful > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  {review.helpful} {review.helpful === 1 ? 'person' : 'people'} found this helpful
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton loading state
ReviewList.Skeleton = function ReviewListSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4 bg-gray-200 rounded mr-1 animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="mt-3 h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="mt-2 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
