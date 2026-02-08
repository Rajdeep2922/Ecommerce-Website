import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { addToCart } = useCart()
    const { isInWishlist, toggleWishlist } = useWishlist()
    const { showToast } = useToast()

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/products/${id}`)
            const data = await response.json()

            if (!data.success) {
                throw new Error(data.error || 'Product not found')
            }

            setProduct(data.data)
            setError(null)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        addToCart(product)
        showToast(`${product.name} added to cart!`)
    }

    const handleToggleWishlist = () => {
        toggleWishlist(product)
        showToast(
            isInWishlist(product.id)
                ? `Removed from wishlist`
                : `Added to wishlist!`
        )
    }

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading product...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="product-detail-page">
                <div className="error-message">
                    <p>{error}</p>
                    <Link to="/products" className="continue-shopping-btn">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="product-detail-page">
            <Link to="/products" className="back-link">
                ← Back to Products
            </Link>

            <div className="product-detail-container">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                    <button
                        className={`wishlist-btn-large ${isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={handleToggleWishlist}
                    >
                        {isInWishlist(product.id) ? '❤️' : '🤍'}
                    </button>
                </div>

                <div className="product-detail-info">
                    <span className="product-category">{product.category}</span>
                    <h1 className="product-detail-name">{product.name}</h1>
                    <p className="product-detail-price">₹{product.price.toFixed(2)}</p>
                    <p className="product-detail-description">
                        {product.description || 'No description available.'}
                    </p>

                    <div className="product-detail-actions">
                        <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
