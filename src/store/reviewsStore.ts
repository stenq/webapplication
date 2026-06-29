import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Review } from '../types';

interface ReviewsStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
}

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };
        set({ reviews: [...get().reviews, newReview] });
      },

      getReviewsByProduct: (productId) => {
        return get().reviews.filter((r) => r.productId === productId);
      },

      getAverageRating: (productId) => {
        const productReviews = get().reviews.filter((r) => r.productId === productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return sum / productReviews.length;
      },
    }),
    {
      name: 'reviews-storage',
    }
  )
);