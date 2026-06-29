import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Catalog() {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'>('name-asc');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        default: return 0;
      }
    });

    return result;
  }, [selectedCategory, minPrice, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setMinPrice(0);
    setMaxPrice(500);
    setSortBy('name-asc');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-light text-center mb-2">Katalog</h1>
      <p className="text-center text-gray-500 mb-8">{filteredProducts.length} produktów</p>

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center text-sm border border-gray-300 px-4 py-2 hover:border-black"
        >
          <SlidersHorizontal size={16} className="mr-2" />
          Filtry
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="text-sm border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
        >
          <option value="name-asc">Nazwa: A-Z</option>
          <option value="name-desc">Nazwa: Z-A</option>
          <option value="price-asc">Cena: rosnąco</option>
          <option value="price-desc">Cena: malejąco</option>
        </select>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        {filtersOpen && (
          <aside className="w-64 flex-shrink-0">
            <div className="bg-brand-light p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Filtry</h3>
                <button onClick={resetFilters} className="text-xs underline">Wyczyść</button>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Kategoria</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="mr-2"
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Cena</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500">Min: {minPrice} zł</label>
                    <input
                      type="range"
                      min={0}
                      max={500}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Max: {maxPrice} zł</label>
                    <input
                      type="range"
                      min={0}
                      max={500}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-20">Brak produktów spełniających kryteria</p>
          ) : (
            <div className={`grid gap-6 ${filtersOpen ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}