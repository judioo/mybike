'use client';

import React from 'react';

/**
 * ProductSkeleton - Skeleton loading state for product detail pages
 * 
 * This component provides a visually pleasing loading state that matches
 * the layout of the product detail page to reduce layout shift when the
 * actual content loads.
 */
export default function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Product info skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          
          {/* Price */}
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          
          {/* Rating */}
          <div className="flex gap-2 items-center">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          
          {/* Options */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded w-10"></div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Add to cart button */}
          <div className="h-12 bg-gray-200 rounded w-full"></div>
          
          {/* Product metadata */}
          <div className="space-y-2 pt-6 border-t border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
      
      {/* Tabs skeleton */}
      <div className="mt-12">
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
        
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Related products skeleton */}
      <div className="mt-16">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
