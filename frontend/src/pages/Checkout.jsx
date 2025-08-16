// // FILE: src/pages/Checkout.jsx
// import { useState, useEffect } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Checkout = () => {
//   const [shippingAddress, setShippingAddress] = useState('')
//   const [paymentMethod, setPaymentMethod] = useState('COD')
//   const location = useLocation()
//   const navigate = useNavigate()
//   const { cartItems } = useSelector((state) => state.cart)
//   const buyNowItems = location.state?.items || null

//   useEffect(() => {
//     if (!buyNowItems && cartItems.length === 0) {
//       toast.error('Cart is empty')
//       navigate('/cart')
//     }
//   }, [cartItems, buyNowItems, navigate])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const config = {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     }
//     try {
//       const payload = { shippingAddress, paymentMethod }
//       if (buyNowItems) {
//         payload.items = buyNowItems
//       }
//       const { data } = await axios.post('/api/orders', payload, config)
//       toast.success('Order placed')
//       // Simulate payment if not COD
//       if (paymentMethod !== 'COD') {
//         // Stub payment
//         await axios.post('/api/payments', { orderId: data._id, amount: data.totalPrice, currency: 'USD' }, config)
//       }
//       navigate('/orders')
//     } catch (error) {
//       toast.error(error.response.data.message)
//     }
//   }

//   const items = buyNowItems || cartItems.map(item => ({ ...item, product: item.product }))
//   const itemsPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0)
//   const taxPrice = (itemsPrice * 0.05).toFixed(2)
//   const shippingPrice = itemsPrice > 500 ? 0 : 50
//   const totalPrice = (itemsPrice + Number(taxPrice) + shippingPrice).toFixed(2)

//   return (
//     <div className="container max-w-md p-4 mx-auto">
//       <h1 className="mb-4 text-3xl font-bold">Checkout</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Shipping Address</label>
//         <input
//           type="text"
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//           className="w-full p-2 mb-4 border"
//           required
//         />
//         <label>Payment Method</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="w-full p-2 mb-4 border"
//         >
//           <option value="COD">Cash on Delivery</option>
//           <option value="Card">Credit Card (Stub)</option>
//         </select>
//         <div className="mb-4">
//           <p>Items Price: ${itemsPrice.toFixed(2)}</p>
//           <p>Tax: ${taxPrice}</p>
//           <p>Shipping: ${shippingPrice}</p>
//           <p>Total: ${totalPrice}</p>
//         </div>
//         <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">Place Order</button>
//       </form>
//     </div>
//   )
// }

// export default Checkout

//--------------------------

// FILE: src/pages/Checkout.jsx
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const Checkout = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'COD'
  })
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const buyNowItems = location.state?.items || null

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout')
    }
    if (!buyNowItems && cartItems.length === 0) {
      toast.error('Your cart is empty')
      navigate('/cart')
    }
  }, [cartItems, buyNowItems, navigate, userInfo])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
     try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const payload = {
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },
      paymentMethod: formData.paymentMethod,
      items: buyNowItems || cartItems.map(item => ({
        productId: item.product,
        qty: item.qty,
        price: item.price
      }))
    };

      const { data } = await axios.post('/api/orders', payload, config)
      toast.success('Order placed successfully!')

      if (formData.paymentMethod !== 'COD') {
        navigate(`/payment/${data._id}`)
      } else {
        navigate(`/order/${data._id}`)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const items = buyNowItems || cartItems
  const itemsPrice = items.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const taxPrice = (itemsPrice * 0.05).toFixed(2)
  const shippingPrice = itemsPrice > 500 ? 0 : 50
  const totalPrice = (itemsPrice + Number(taxPrice) + shippingPrice).toFixed(2)

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 bg-indigo-600">
            <h1 className="text-2xl font-bold text-white">Checkout</h1>
          </div>
          
          <div className="grid gap-8 p-6 md:grid-cols-2">
            {/* Shipping Information */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Order Summary</h2>
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="mb-2 font-medium text-gray-700">Your Items</h3>
                <div className="mb-4 space-y-3">
              {items.map((item) => (
  <div key={item.product} className="flex items-center justify-between">
    <div className="flex items-center">
      <img 
        src={item.image || item.product?.image || '/placeholder-product.jpg'} 
        alt={item.name}
        className="object-cover w-12 h-12 mr-3 rounded-md"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = '/placeholder-product.jpg'
        }}
      />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${taxPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">${totalPrice}</span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full mt-6 py-3 px-4 rounded-md text-white font-medium ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout