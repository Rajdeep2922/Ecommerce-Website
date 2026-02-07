import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Cart from './pages/Cart'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/products" replace />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
