// FILE: src/pages/Home.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import API from "../utils/api";

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await API.get('/api/products?limit=6')
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home