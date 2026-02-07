import { useCart } from '../context/CartContext'

function CartItem({ item }) {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
    const subtotal = item.price * item.quantity

    return (
        <div className="cart-item">
            <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
            />
            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₹{item.price.toFixed(2)} each</p>
                <div className="cart-item-actions">
                    <div className="quantity-controls">
                        <button
                            className="quantity-btn"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                            className="quantity-btn"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                    >
                        🗑️ Remove
                    </button>
                </div>
            </div>
            <div className="cart-item-subtotal">
                ₹{subtotal.toFixed(2)}
            </div>
        </div>
    )
}

export default CartItem
