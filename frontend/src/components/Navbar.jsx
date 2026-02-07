import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
    const location = useLocation()
    const { totalItems } = useCart()

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/products" className="navbar-logo">
                    <span className="navbar-logo-icon">🛍️</span>
                    <span>MiniShop</span>
                </Link>

                <div className="navbar-links">
                    <Link
                        to="/products"
                        className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                    >
                        <span>📦</span>
                        <span>Products</span>
                    </Link>
                    <Link
                        to="/cart"
                        className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                    >
                        <span>🛒</span>
                        <span>Cart</span>
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
