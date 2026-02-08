import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [search, category])

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/products/categories`)
            const data = await response.json()
            if (data.success) {
                setCategories(data.data)
            }
        } catch (err) {
            console.error('Error fetching categories:', err)
        }
    }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (search) params.append('search', search)
            if (category && category !== 'all') params.append('category', category)

            const url = `${API_URL}/products${params.toString() ? '?' + params.toString() : ''}`
            const response = await fetch(url)

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

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    return (
        <div className="products-page">
            <header className="page-header">
                <h1 className="page-title">Our Products</h1>
                <p className="page-subtitle">
                    Discover our curated collection of premium items
                </p>
            </header>

            {/* Search and Filter Controls */}
            <div className="products-controls">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>

                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="category-select"
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={fetchProducts} className="continue-shopping-btn">
                        Try Again
                    </button>
                </div>
            )}

            {loading ? (
                <div className="products-grid">
                    {[...Array(8)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="cart-empty">
                    <div className="cart-empty-icon">🔍</div>
                    <h2>No products found</h2>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Products
