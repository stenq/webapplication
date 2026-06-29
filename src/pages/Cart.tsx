import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-light mb-4">Koszyk jest pusty</h1>
        <p className="text-gray-500 mb-8">Dodaj produkty do koszyka, aby kontynuować.</p>
        <Link to="/catalog" className="inline-block bg-black text-white px-8 py-3 text-sm tracking-widest">
          PRZEJDŹ DO KATALOGU
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-light mb-12">Koszyk</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex border-b border-gray-200 pb-6">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover bg-brand-light"
              />
              <div className="flex-1 ml-6">
                <h3 className="font-light">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                <p className="mt-2">{item.price.toFixed(2)} zł</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex items-center border border-gray-300">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >−</button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-light p-8 h-fit">
          <h2 className="font-medium mb-6">Podsumowanie</h2>
          <div className="space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span>Wartość produktów</span>
              <span>{getTotalPrice().toFixed(2)} zł</span>
            </div>
            <div className="flex justify-between">
              <span>Dostawa</span>
              <span>15,00 zł</span>
            </div>
            <div className="flex justify-between font-medium pt-3 border-t border-gray-300 mt-3 text-base">
              <span>Razem</span>
              <span>{(getTotalPrice() + 15).toFixed(2)} zł</span>
            </div>
          </div>
          <Link to="/checkout" className="block bg-black text-white text-center py-3 text-sm tracking-widest hover:bg-gray-800 transition">
            PRZEJDŹ DO KASY
          </Link>
        </div>
      </div>
    </div>
  );
}