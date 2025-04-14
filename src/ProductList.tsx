import React from "react";
import { Product } from "./types";

interface Props{
    products: Product[];
    handleAddToCart: (product: Product) => void;
    quantities: { [key: number]: number };
    setQuantities: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>
}

export const ProductList: React.FC<Props> = ({ products, handleAddToCart, quantities, setQuantities }) => {
    return(
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flexShrink: 10  }}>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <h2 >
                Products
            </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
            {
                products.map((products) => (
                    <div key={products.id} className="card">
                       <div style={{ display: 'flex', flexDirection: 'column',}}>
                        <p color="black" style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>
                            {products.name}
                        </p>
                        <p color="black" style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>
                             ${products.price}
                        </p>
                       </div>
                        <button onClick={() => handleAddToCart(products)} style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '10px'
                        }}>Add to Cart</button>
                    </div>
                ))
            }
            </div>
        </div>
    )
}