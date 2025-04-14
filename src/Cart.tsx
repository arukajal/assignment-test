import React from "react";
import { Product } from "./types";

interface Props {
    items: Product[];
    updateQuantities: (id: number, quantity: number) => void;
}

export const Cart: React.FC<Props> = ({ items, updateQuantities }) => {

    if (items.length === 0) {
        return <p>Your cart is empty</p>;
    }
    return (
        <div >

            <h2>Cart Items</h2>
            {items.map((item) => (
                <div key={item.id} className="card-big" >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <p>{item.name}</p>
                    <p>${item.price} X {item.quantity} = ${item.price * (item.quantity || 1)}</p>
                    <div>
                        {item.id !== 99 && (
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                            <button style={{
                                backgroundColor: 'red',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                marginRight: '5px',
                                height: '30px',
                                width: '30px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                
                            }} 
                            onClick={() => updateQuantities(item.id, Math.max(1, (item.quantity || 1) - 1))}>-</button>
                            <span style={{margin: '5px',                                 alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex'}}>{item.quantity}</span>
                            <button style={{
                                backgroundColor: 'green',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                marginLeft: '5px',
                                height: '30px',
                                width: '30px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',

                            }}onClick={() => updateQuantities(item.id, (item.quantity || 1) + 1)}>+</button>
                            {
                                item.id === 99 && (
                                    <p>Free Gift</p>
                                )
                            }
                            </div>
                        )}
                        </div>

                </div>
                </div>
            ))}
        </div>
    )
}