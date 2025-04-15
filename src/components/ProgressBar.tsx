// src/components/ProgressBar.tsx
import React from "react";
import { RUPEES, THRESHOLD } from "../constants";

interface ProgressBarProps {
  subtotal: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ subtotal }) => {
  const percentage = Math.min((subtotal / THRESHOLD) * 100, 100);
  const amountRemaining = THRESHOLD - subtotal;

  return (
    <div>
      <h2>Cart Summary</h2>
      <div className="progressbar">
        <div className="progressbar-header">
          <p>SubTotal:</p>{RUPEES}{subtotal.toFixed(2)}{" "}
        </div>
        <div>
          <hr />
        </div>
        <p>
          {subtotal < THRESHOLD
            ? `Add ${RUPEES}${amountRemaining} more for a free gift!`
            : "Free gift unlocked!"}
        </p>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
