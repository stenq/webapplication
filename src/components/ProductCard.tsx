import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-brand-light aspect-square overflow-hidden mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <h3 className="text-sm font-light text-center">{product.name}</h3>
      <p className="text-sm text-center mt-1">{product.price.toFixed(2)} zł</p>
    </Link>
  );
}