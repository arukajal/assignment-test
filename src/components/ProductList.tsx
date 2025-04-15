// src/components/ProductList.tsx
import React from "react";
import { Product } from "../types";
import { RUPEES } from "../constants";

interface ProductListProps {
  products: Product[];
  quantities: { [key: number]: number };
  handleAddToCart: (product: Product, quantity: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  quantities,
  handleAddToCart,
}) => {
  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="product-card-container">
        {products.map((product) => {
          const qty = quantities[product.id] || 1;
          return (
            <div key={product.id} className="product-card">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{RUPEES}{product.price}</p>
              <div className="quantity-selector">
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product, qty)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
