import React from "react";

interface ProgressBarProps {
    subtotal: number;
    threshold: number;
    items: { id: number; name: string; price: number; quantity?: number }[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ subtotal, threshold, items }) => {
    const percentage = Math.min((subtotal / threshold) * 100, 100);
    const remaining = Math.max(0, threshold - subtotal)
    return (
        <div>
         <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <h2 >
                Cart Summary
            </h2>
            </div>
        <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', marginTop: '20px', padding: '10px', color: 'black' }}>
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', color: 'black' }}>
                <p>Total Items: {items.length}</p>
                <p>Total Price: ${items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)}</p>
            </div>
        <div >
            <div
                style={{
                    width: `${percentage}%`,
                    backgroundColor: subtotal >= threshold ? '#4caf50' : '#2196F3',
                    height: '20px',
                    borderRadius: '5px',
                }}
            ></div>
            <p style={{ textAlign: 'center', marginTop: '5px', color: 'black' }}>
                {remaining > 0 ? `Spend $${remaining} more to unlock the free gift!` : `Free gift unlocked!`}
            </p>
        </div>
        </div>
        </div>
    );
}