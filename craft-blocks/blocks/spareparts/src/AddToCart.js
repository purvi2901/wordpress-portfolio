import React, { useState } from 'react';

const AddToCartForm = ({ productId }) => {
    const [quantity, setQuantity] = useState(1);

    const handleChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleAddToCart = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/wp-json/wc/store/cart/add-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: quantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            console.log(`Added ${quantity} units of product ${productId} to the cart.`);
            
            // Reset quantity after adding to cart
            setQuantity(1);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <form onSubmit={handleAddToCart}>
            <label>
                Quantity:
                <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={handleChange} 
                />
            </label>
            <button type="submit">Add to Cart</button>
        </form>
    );
};

export default AddToCartForm;
