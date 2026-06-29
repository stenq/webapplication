import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-light mb-4">Dziękujemy za zamówienie!</h1>
        <p className="text-gray-500">Wkrótce otrzymasz potwierdzenie na email.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-light mb-12">Kasa</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-medium mb-4">Dane dostawy</h2>
          <input type="text" placeholder="Imię" required className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black" />
          <input type="text" placeholder="Nazwisko" required className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black" />
          <input type="email" placeholder="Email" required className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black" />
          <input type="tel" placeholder="Telefon" required className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black" />
          <input type="text" placeholder="Adres" required className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Kod pocztowy" required className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black" />
            <input type="text" placeholder="Miasto" required className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black" />
          </div>
        </div>

        <div>
          <h2 className="font-medium mb-4">Podsumowanie</h2>
          <div className="bg-brand-light p-6 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)} zł</span>
              </div>
            ))}
            <div className="border-t border-gray-300 pt-3 flex justify-between font-medium">
              <span>Razem</span>
              <span>{(getTotalPrice() + 15).toFixed(2)} zł</span>
            </div>
          </div>
          <button type="submit" className="w-full mt-6 bg-black text-white py-4 text-sm tracking-widest hover:bg-gray-800 transition">
            ZŁÓŻ ZAMÓWIENIE
          </button>
        </div>
      </form>
    </div>
  );
}