// FILE: src/pages/ProductDetails.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!userInfo) {
      toast.error('Please login to add to cart')
      navigate('/login')
      return
    }
    dispatch(addToCart({ productId: id, qty }))
  }

  const handleBuyNow = () => {
    if (!userInfo) {
      toast.error('Please login to buy')
      navigate('/login')
      return
    }
    navigate('/checkout', { state: { items: [{ productId: id, qty }] } })
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img src={product.images[0] || 'https://via.placeholder.com/400'} alt={product.name} className="w-full md:w-1/2 h-96 object-cover" />
        <div className="md:ml-4 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">${product.price}</p>
          <p className="mt-2">{product.description}</p>
          <div className="mt-4">
            <label>Quantity:</label>
            <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="ml-2 p-2 border">
              {[...Array(product.stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddToCart} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
          <button onClick={handleBuyNow} className="bg-green-600 text-white px-4 py-2 rounded mt-4 ml-2">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails