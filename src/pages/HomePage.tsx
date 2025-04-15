// src/pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import { PRODUCTS, FREE_GIFT, THRESHOLD } from "../constants";
import { Product } from "../types";
import { ProductList } from "../components/ProductList";
import { ProgressBar } from "../components/ProgressBar";
import { Cart } from "../components/Cart";

const HomePage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [giftMessage, setGiftMessage] = useState(false);

  const subtotal = cart
    .filter((item) => item.id !== FREE_GIFT.id)
    .reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0);

  useEffect(() => {
    const hasFreeGift = cart.some((item) => item.id === FREE_GIFT.id);

    if (subtotal >= THRESHOLD && !hasFreeGift) {
      setCart((prev) => [...prev, { ...FREE_GIFT, quantity: 1 }]);
      setGiftMessage(true);
      setTimeout(() => setGiftMessage(false), 3000);
    }
    if (subtotal < THRESHOLD && hasFreeGift) {
      setCart((prev) => prev.filter((item) => item.id !== FREE_GIFT.id));
    }
  }, [subtotal]);

  const updateProductQuantity = (id: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    updateProductQuantity(product.id, 1);
  };

  const updateCartQuantity = (id: number, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };


  return (
    <div className="container">
        <div className="header">
        <h1 >Shopping Cart</h1>
        </div>
      <ProductList
        products={PRODUCTS}
        quantities={quantities}
        handleAddToCart={handleAddToCart}
      />
      <ProgressBar subtotal={subtotal} />
      {giftMessage && (
        <div className="gift-message">
          <p>
            Congratulations! You have earned a free gift: {FREE_GIFT.name}
          </p>
        </div>
      )}
      <Cart
        items={cart}
        updateCartQuantity={updateCartQuantity}
      />
    </div>
  );
};

export default HomePage;
