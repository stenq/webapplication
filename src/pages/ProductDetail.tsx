import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { useReviewsStore } from '../store/reviewsStore';
import { ChevronLeft, Check, Star } from 'lucide-react';
import Reviews from '../components/Reviews';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const getAverageRating = useReviewsStore((state) => state.getAverageRating);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-light">Produkt nie znaleziony</h1>
        <Link to="/catalog" className="mt-4 inline-block text-sm underline">
          Wróć do katalogu
        </Link>
      </div>
    );
  }

  const avgRating = getAverageRating(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link to="/catalog" className="inline-flex items-center text-sm text-gray-500 mb-8 hover:text-black">
        <ChevronLeft size={16} /> Wróć do katalogu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-brand-light aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-3xl font-light mb-4">{product.name}</h1>
          
          {avgRating > 0 && (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">{avgRating.toFixed(1)}</span>
            </div>
          )}

          <p className="text-2xl font-light mb-8">{product.price.toFixed(2)} zł</p>
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">
              {product.stock > 10 ? '✓ Dostępny' : `Pozostało: ${product.stock} szt.`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm">Ilość:</span>
            <div className="flex items-center border border-gray-300">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >−</button>
              <span className="px-4">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >+</button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-4 text-sm tracking-widest transition ${
              added 
                ? 'bg-green-600 text-white' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {added ? (
              <span className="flex items-center justify-center"><Check size={16} className="mr-2" /> DODANO DO KOSZYKA</span>
            ) : (
              'DODAJ DO KOSZYKA'
            )}
          </button>
        </div>
      </div>

      <Reviews productId={product.id} />
    </div>
  );
}