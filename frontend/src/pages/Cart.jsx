import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

function Cart() {
    const { cartItems, totalPrice, totalItems, clearCart } = useCart()

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <header className="page-header">
                    <h1 className="page-title">Shopping Cart</h1>
                </header>

                <div className="cart-empty">
                    <div className="cart-empty-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <Link to="/products" className="continue-shopping-btn">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="cart-page">
            <header className="page-header">
                <h1 className="page-title">Shopping Cart</h1>
                <p className="page-subtitle">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
            </header>

            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                <aside className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="summary-row">
                        <span>Tax</span>
                        <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                    </div>

                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{(totalPrice * 1.1).toFixed(2)}</span>
                    </div>

                    <button className="checkout-btn">
                        Proceed to Checkout →
                    </button>

                    <button className="clear-cart-btn" onClick={clearCart}>
                        Clear Cart
                    </button>
                </aside>
            </div>
        </div>
    )
}

export default Cart
