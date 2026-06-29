export default function Footer() {
  return (
    <footer className="bg-brand-light mt-32 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-light tracking-widest mb-4">CONCRETE</h3>
          <p className="text-sm text-gray-600">Minimalistyczne narzędzia i materiały dla profesjonalistów.</p>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">Sklep</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Narzędzia</li>
            <li>Materiały</li>
            <li>Akcesoria</li>
            <li>Nowości</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">Pomoc</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Kontakt</li>
            <li>Wysyłka</li>
            <li>Zwroty</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm">Newsletter</h4>
          <p className="text-sm text-gray-600 mb-3">Bądź na bieżąco z naszymi produktami.</p>
          <input 
            type="email" 
            placeholder="Twój email"
            className="w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-300 text-sm text-gray-500 text-center">
        © 2026 CONCRETE. Wszystkie prawa zastrzeżone.
      </div>
    </footer>
  );
}