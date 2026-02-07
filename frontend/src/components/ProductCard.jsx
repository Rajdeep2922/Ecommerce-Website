import { useState } from 'react'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
    const { addToCart } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        addToCart(product)
        setIsAdded(true)

        // Reset the button state after 1.5 seconds
        setTimeout(() => {
            setIsAdded(false)
        }, 1500)
    }

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price.toFixed(2)}</p>
                <button
                    className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                    onClick={handleAddToCart}
                >
                    {isAdded ? (
                        <>✓ Added to Cart</>
                    ) : (
                        <>🛒 Add to Cart</>
                    )}
                </button>
            </div>
        </div>
    )
}

export default ProductCard
