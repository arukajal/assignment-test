import { useEffect, useState } from 'react'
import { PRODUCTS, FREE_GIFT, THRESHOLD } from './constants';
import { ProductList } from './ProductList';
import { Cart } from './Cart';
import { ProgressBar } from './ProgressBar';
import { Product } from './types';
import './App.css'

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [showGift, setShowGift] = useState(false);

  const subtotal = cart.filter((item) => item.id !== FREE_GIFT.id)
    .reduce((sum, item) => sum + (item.quantity || 1) * item.price, 0);

    const hasFreeGift = cart.some((item) => item.id === FREE_GIFT.id);

    useEffect(() => {
      if(subtotal >= THRESHOLD && !hasFreeGift) {
        setShowGift(true);
        setCart((prev) => [...prev, {...FREE_GIFT, quantity: 1}]);
        setTimeout(() => setShowGift(false), 3000);

        }
        
        if (subtotal < THRESHOLD && hasFreeGift) {
          setCart((prev) => prev.filter((item) => item.id !== FREE_GIFT.id));
        }
      }, [subtotal]);

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    setCart((prev) => { 
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    })

    setQuantities((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
  }

  const updateQuantities = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="app">
      <div>
        <h2>
          Shopping Cart
        </h2>
        <ProductList
          products={PRODUCTS}
          handleAddToCart={handleAddToCart}
        />
        <ProgressBar
          subtotal={subtotal}
          threshold={THRESHOLD}
          items={cart}
        />
        {
          showGift && (
            <div className="gift">
              <p>Congratulations! You have earned a free gift: {FREE_GIFT.name}</p>
            </div>
          )
        }
        <Cart
          items={cart}
          updateQuantities={updateQuantities}
        />
      </div>
    </div>
  )
}

export default App
