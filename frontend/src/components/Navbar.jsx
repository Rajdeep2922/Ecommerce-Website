import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function Navbar() {
    const location = useLocation()
    const { totalItems } = useCart()
    const { wishlistItems } = useWishlist()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/products" className="navbar-logo" onClick={closeMenu}>
                    <span className="navbar-logo-icon">🛍️</span>
                    <span>MiniShop</span>
                </Link>

                {/* Hamburger Menu Button */}
                <button
                    className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Navigation Links */}
                <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link
                        to="/products"
                        className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                        onClick={closeMenu}
                    >
                        <span>📦</span>
                        <span>Products</span>
                    </Link>
                    <Link
                        to="/wishlist"
                        className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}
                        onClick={closeMenu}
                    >
                        <span>❤️</span>
                        <span>Wishlist</span>
                        {wishlistItems.length > 0 && (
                            <span className="wishlist-badge">{wishlistItems.length}</span>
                        )}
                    </Link>
                    <Link
                        to="/cart"
                        className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                        onClick={closeMenu}
                    >
                        <span>🛒</span>
                        <span>Cart</span>
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </Link>
                </div>

                {/* Overlay for mobile menu */}
                {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
            </div>
        </nav>
    )
}

export default Navbar
