// FILE: src/pages/ProductList.jsx
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import API from "../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const limit = 12

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const search = searchParams.get('search') || ''

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')
        const { data } = await API.get(
          `/api/products?page=${page}&limit=${limit}&search=${search}`
        )
        setProducts(data.products || [])
        setTotal(data.total || 0)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [page, search])

  const pages = Math.ceil(total / limit)

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Products</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && products.length === 0 && <p>No products found</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {pages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
