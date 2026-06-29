import { useState } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReviewsStore } from '../store/reviewsStore';
import { useAuthStore } from '../store/authStore';

interface ReviewsProps {
  productId: string;
}

export default function Reviews({ productId }: ReviewsProps) {
  const { getReviewsByProduct, addReview, getAverageRating } = useReviewsStore();
  const { currentUser } = useAuthStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const reviews = getReviewsByProduct(productId);
  const avgRating = getAverageRating(productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    addReview({
      productId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
    });
    setComment('');
    setRating(5);
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light">Opinie ({reviews.length})</h2>
        {reviews.length > 0 && (
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={star <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="ml-2 text-sm">{avgRating.toFixed(1)}/5</span>
          </div>
        )}
      </div>

      {/* Review Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-12 bg-brand-light p-6">
          <h3 className="font-medium mb-4">Dodaj swoją opinię</h3>
          <div className="flex items-center mb-4">
            <span className="text-sm mr-3">Ocena:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    size={24}
                    className={
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Napisz swoją opinię..."
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black mb-4"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 text-sm tracking-widest hover:bg-gray-800 transition"
          >
            DODAJ OPINIĘ
          </button>
        </form>
      ) : (
        <div className="mb-12 bg-brand-light p-6 text-center">
          <p className="text-sm text-gray-600">
            <Link to="/login" className="underline">Zaloguj się</Link>, aby dodać opinię
          </p>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Brak opinii. Bądź pierwszy!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-medium mr-3">{review.userName}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString('pl-PL')}
                </span>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}