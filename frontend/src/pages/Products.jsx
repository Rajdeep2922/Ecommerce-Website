import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

// API base URL - uses environment variable or defaults to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/products`)

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const data = await response.json()
            setProducts(data.data || [])
            setError(null)
        } catch (err) {
            console.error('Error fetching products:', err)
            setError('Failed to load products. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchProducts} className="continue-shopping-btn">
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="products-page">
            <header className="page-header">
                <h1 className="page-title">Our Products</h1>
                <p className="page-subtitle">
                    Discover our curated collection of premium items
                </p>
            </header>

            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default Products
