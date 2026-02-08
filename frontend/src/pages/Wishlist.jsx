import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist()
    const { addToCart } = useCart()
    const { showToast } = useToast()

    const handleAddToCart = (product) => {
        addToCart(product)
        showToast(`${product.name} added to cart!`)
    }

    const handleRemove = (product) => {
        removeFromWishlist(product.id)
        showToast('Removed from wishlist')
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-page">
                <header className="page-header">
                    <h1 className="page-title">My Wishlist</h1>
                </header>

                <div className="cart-empty">
                    <div className="cart-empty-icon">💝</div>
                    <h2>Your wishlist is empty</h2>
                    <p>Save items you love by clicking the heart icon.</p>
                    <Link to="/products" className="continue-shopping-btn">
                        ← Browse Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="wishlist-page">
            <header className="page-header">
                <h1 className="page-title">My Wishlist</h1>
                <p className="page-subtitle">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </p>
            </header>

            <div className="products-grid">
                {wishlistItems.map((product) => (
                    <div key={product.id} className="product-card wishlist-card">
                        <div className="product-image-container">
                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </Link>
                            <button
                                className="wishlist-remove-btn"
                                onClick={() => handleRemove(product)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">₹{product.price.toFixed(2)}</p>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(product)}
                            >
                                🛒 Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist
