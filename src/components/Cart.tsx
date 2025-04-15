// src/components/Cart.tsx
import React from "react";
import { Product } from "../types";
import { FREE_GIFT, RUPEES } from "../constants";

interface CartProps {
  items: Product[];
  updateCartQuantity: (id: number, quantity: number) => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  updateCartQuantity,
}) => {
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <p className="cart-item-name">{item.name}</p>
            <p className="cart-item-price">
              {RUPEES}{item.price} x {item.quantity} = {RUPEES}
              {(item.price * (item.quantity || 1)).toFixed(2)}
            </p>
          </div>
          {item.id !== FREE_GIFT.id && (
            <div className="cart-item-controls">
              <button
                onClick={() =>
                  updateCartQuantity(
                    item.id,
                    Math.max((item.quantity || 1) - 1, 1)
                  )
                }
              >
                –
              </button>
              <span>{item.quantity}</span>
                <button
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() =>
                  updateCartQuantity(item.id, (item.quantity || 1) + 1)
                }
                >
                +
                </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
