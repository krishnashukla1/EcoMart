// FILE: src/pages/ProductDetails.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-toastify'
import API from "../utils/api";

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/api/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!userInfo) {
      toast.error('Please login to add to cart')
      // navigate('/login')
      navigate('/auth')

      return
    }
    dispatch(addToCart({ productId: id, qty }))
  }

  const handleBuyNow = () => {
    if (!userInfo) {
      toast.error('Please login to buy')
      // navigate('/login')
      navigate('/auth')

      return
    }
    navigate('/checkout', { state: { items: [{ productId: id, qty }] } })
  }

  if (!product) return <div>Loading...</div>

  return (
   <div className="container p-6 mx-auto">
  <div className="flex flex-col gap-6 md:flex-row">
    
    {/* LEFT: Product Image */}
    <div className="flex items-center justify-center w-full p-6 bg-white border rounded-lg shadow-md md:w-1/2">
      <img
        src={product.images[0] || 'https://via.placeholder.com/400'}
        alt={product.name}
        className="object-contain max-h-[500px] w-full"
      />
    </div>

    {/* RIGHT: Product Info */}
    <div className="flex flex-col justify-between w-full p-6 bg-white border rounded-lg shadow-md md:w-1/2">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        
        {/* Brand */}
        <p className="mt-1 text-sm text-gray-500">Brand: <span className="font-medium">{product.brand}</span></p>
        
        {/* Price */}
        <p className="mt-3 text-2xl font-bold text-green-600">₹{product.price}</p>

        {/* Description */}
        <p className="mt-3 text-gray-700">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mt-2 space-x-1 text-yellow-500">
          <span className="font-semibold">{product.rating} ★</span>
          <span className="text-sm text-gray-600">(Customer Reviews)</span>
        </div>

        {/* Quantity Selector */}
        <div className="mt-4">
          <label className="text-sm font-medium">Quantity:</label>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="p-2 ml-2 border rounded-lg"
          >
            {[...Array(product.stock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 px-4 py-3 text-lg font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 px-4 py-3 text-lg font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default ProductDetails