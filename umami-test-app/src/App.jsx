import { useState, useEffect } from 'react';
import { BarChart3, Users, ShoppingCart, Heart, Star, TrendingUp } from 'lucide-react';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likes, setLikes] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.defer = true;
    script.src = window.runtimeConfig.UMAMI_SCRIPT_URL;
    script.setAttribute('data-website-id', window.runtimeConfig.UMAMI_WEBSITE_ID);
    document.head.appendChild(script);

    setTimeout(() => {
      if (window.umami) window.umami.track('page_view');
    }, 1000);
  }, []);

  const trackEvent = (eventName, eventData = {}) => {
    if (window.umami) {
      window.umami.track(eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
  };

  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
    trackEvent('button_click', { count: clickCount + 1 });
  };

  const handleProductView = (product) => {
    setSelectedProduct(product);
    trackEvent('product_view', { product_name: product.name, product_price: product.price });
  };

  const handleAddToCart = (product) => {
    trackEvent('add_to_cart', { product_name: product.name, product_price: product.price });
    alert(`Dodano ${product.name} do koszyka!`);
  };

  const handleLike = () => {
    setLikes(likes + 1);
    trackEvent('like_button', { total_likes: likes + 1 });
  };

  const handleRating = (stars) => {
    setRating(stars);
    trackEvent('rating_submit', { stars });
  };

  const products = [
    { id: 1, name: 'Laptop Pro', price: 4999, category: 'Elektronika' },
    { id: 2, name: 'Słuchawki Wireless', price: 299, category: 'Audio' },
    { id: 3, name: 'Smartwatch', price: 799, category: 'Elektronika' },
    { id: 4, name: 'Klawiatura Mechaniczna', price: 399, category: 'Akcesoria' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Aplikacja Testowa Umami Analytics</h1>
          </div>
          <p className="text-gray-600">
            Przetestuj różne wydarzenia i śledź je w swoim dashboardzie Umami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sekcja interakcji */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Interakcje Użytkownika
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <button
                  onClick={handleButtonClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
                >
                  Kliknij mnie! (Kliknięć: {clickCount})
                </button>
              </div>

              <div className="p-4 bg-pink-50 rounded-lg">
                <button
                  onClick={handleLike}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" fill={likes > 0 ? "white" : "none"} />
                  Polub ({likes})
                </button>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-gray-700 font-medium mb-2">Oceń aplikację:</p>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className="transition duration-200 transform hover:scale-110"
                    >
                      <Star
                        className="w-8 h-8"
                        fill={star <= rating ? "#FCD34D" : "none"}
                        stroke={star <= rating ? "#FCD34D" : "#9CA3AF"}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center mt-2 text-gray-600">Twoja ocena: {rating}/5</p>
                )}
              </div>
            </div>
          </div>

          {/* Sekcja produktów */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              Katalog Produktów
            </h2>
            
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-400 transition duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <span className="text-lg font-bold text-green-600">{product.price} zł</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleProductView(product)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-200"
                    >
                      Zobacz
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200"
                    >
                      Do koszyka
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sekcja szczegółów produktu */}
        {selectedProduct && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Szczegóły Produktu
            </h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-600 mb-2">Kategoria: {selectedProduct.category}</p>
              <p className="text-2xl font-bold text-purple-600">{selectedProduct.price} zł</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600">
            Wszystkie zdarzenia są śledzone przez Umami Analytics
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Sprawdź dashboard Umami, aby zobaczyć statystyki w czasie rzeczywistym
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;