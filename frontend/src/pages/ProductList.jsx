// FILE: src/pages/ProductList.jsx
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 12
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const search = searchParams.get('search') || ''

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products?page=${page}&limit=${limit}&search=${search}`)
      setProducts(data.products)
      setTotal(data.total)
    }
    fetchProducts()
  }, [page, search])

  const pages = Math.ceil(total / limit)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductList