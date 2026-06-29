import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const bestsellers = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-brand-light flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            Concrete<br/>Collection
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Minimalistyczne narzędzia dla profesjonalistów
          </p>
          <Link 
            to="/catalog" 
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-widest hover:bg-gray-800 transition"
          >
            ODKRYJ KOLEKCJĘ
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-light text-center mb-12">Bestsellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/catalog/narzędzia" className="relative h-96 bg-brand-light overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800" 
              alt="Narzędzia"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <h3 className="text-white text-2xl font-light">Narzędzia</h3>
            </div>
          </Link>
          <Link to="/catalog/materiały" className="relative h-96 bg-brand-light overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800" 
              alt="Materiały"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <h3 className="text-white text-2xl font-light">Materiały</h3>
            </div>
          </Link>
          <Link to="/catalog/akcesoria" className="relative h-96 bg-brand-light overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800" 
              alt="Akcesoria"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <h3 className="text-white text-2xl font-light">Akcesoria</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}