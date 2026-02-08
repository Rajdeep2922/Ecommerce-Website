import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

function ProductCard({ product }) {
    const { addToCart } = useCart()
    const { isInWishlist, toggleWishlist } = useWishlist()
    const { showToast } = useToast()
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        addToCart(product)
        setIsAdded(true)
        showToast(`${product.name} added to cart!`)

        setTimeout(() => {
            setIsAdded(false)
        }, 1500)
    }

    const handleToggleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(product)
        showToast(
            isInWishlist(product.id)
                ? 'Removed from wishlist'
                : 'Added to wishlist!'
        )
    }

    return (
        <div className="product-card">
            <div className="product-image-container">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                    />
                </Link>
                <button
                    className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={handleToggleWishlist}
                    aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    {isInWishlist(product.id) ? '❤️' : '🤍'}
                </button>
                {product.category && (
                    <span className="product-badge">{product.category}</span>
                )}
            </div>
            <div className="product-info">
                <Link to={`/products/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
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
