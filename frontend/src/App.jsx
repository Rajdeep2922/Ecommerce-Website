import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
            </main>
            <Toast />
        </div>
    )
}

export default App
