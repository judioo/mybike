'use client';

import React, { useState } from 'react';
import { useUIStore, showSuccess } from '@/lib/stores/ui-store';
import ReviewStar from './ReviewStar';

interface ReviewFormProps {
  productId: string;
  productTitle: string;
  onReviewSubmitted?: () => void;
}

export default function ReviewForm({
  productId,
  productTitle,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setLoading } = useUIStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Review content is required';
    }
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setLoading('product', true);
    
    try {
      // In a real app, this would be an API call to submit the review
      // For now, we'll simulate a successful submission with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setRating(0);
      setTitle('');
      setContent('');
      setName('');
      setEmail('');
      
      // Show success message
      showSuccess('Your review has been submitted successfully!', 'Thank you for your feedback');
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({
        form: 'There was an error submitting your review. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      setLoading('product', false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
      <p className="text-sm text-gray-500 mb-6">
        Share your experience with {productTitle}
      </p>
      
      {errors.form && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="mr-1 focus:outline-none"
                aria-label={`Rate ${star} stars`}
              >
                <span className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
                  <ReviewStar 
                    filled={star <= rating} 
                    size="md" 
                  />
                </span>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-1">
            Review Title (optional)
          </label>
          <input
            type="text"
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Summarize your experience"
            maxLength={100}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 mb-1">
            Review Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="What did you like or dislike about this product?"
            required
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="reviewer-name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="reviewer-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="reviewer-email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="reviewer-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Skeleton loading state
export function Skeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
      
      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 mr-1"></div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      
      <div className="mb-4">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-24 bg-gray-200 rounded w-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}
