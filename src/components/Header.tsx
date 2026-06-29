import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, User, LogOut, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { products } from '../data/products';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { currentUser, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const searchResults = searchQuery.length > 0
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>

        <Link to="/" className="text-2xl font-light tracking-widest">
          EUROPUTZ
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className="hover:text-gray-500 transition">Strona główna</Link>
          <Link to="/catalog" className="hover:text-gray-500 transition">Katalog</Link>
          <Link to="/catalog/narzędzia" className="hover:text-gray-500 transition">Narzędzia</Link>
          <Link to="/catalog/materiały" className="hover:text-gray-500 transition">Materiały</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-gray-500 transition"
          >
            <Search size={20} />
          </button>

          {/* User menu */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="hover:text-gray-500 transition"
            >
              <User size={20} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg">
                {currentUser ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Wyloguj
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Zaloguj się
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Zarejestruj się
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className="relative hover:text-gray-500 transition">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Szukaj produktów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X size={20} />
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center p-3 hover:bg-gray-50 border border-gray-100"
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-sm">{product.price.toFixed(2)} zł</p>
                  </Link>
                ))}
              </div>
            )}

            {searchQuery.length > 0 && searchResults.length === 0 && (
              <p className="mt-4 text-center text-gray-500 text-sm">
                Nie znaleziono produktów dla "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          <Link to="/" className="block text-sm" onClick={() => setMenuOpen(false)}>Strona główna</Link>
          <Link to="/catalog" className="block text-sm" onClick={() => setMenuOpen(false)}>Katalog</Link>
          <Link to="/catalog/narzędzia" className="block text-sm" onClick={() => setMenuOpen(false)}>Narzędzia</Link>
          <Link to="/catalog/materiały" className="block text-sm" onClick={() => setMenuOpen(false)}>Materiały</Link>
        </nav>
      )}
    </header>
  );
}