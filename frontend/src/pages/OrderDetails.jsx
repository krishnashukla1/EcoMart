import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from "../utils/api";

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
        const { data } = await API.get(`/api/orders/${id}`, config)
        setOrder(data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching order details')
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    
    switch (status) {
      case 'Pending': return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'Paid': return `${baseClasses} bg-blue-100 text-blue-800`
      case 'Completed': return `${baseClasses} bg-green-100 text-green-800`
      case 'Shipped': return `${baseClasses} bg-purple-100 text-purple-800`
      default: return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container p-8 mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>
        <Link 
          to="/orders" 
          className="inline-block px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
          <p className="text-gray-500">Order ID: {order._id}</p>
        </div>
        <Link 
          to="/orders" 
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Orders
        </Link>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Status</span>
              <span className={getStatusBadge(order.status)}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date Placed</span>
              <span className="font-medium">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium capitalize">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-lg font-bold">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Shipping Information</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1 text-gray-800">{order.shippingAddress.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">City</h3>
                <p className="mt-1 text-gray-800">{order.shippingAddress.city}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Postal Code</h3>
                <p className="mt-1 text-gray-800">{order.shippingAddress.postalCode}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Country</h3>
              <p className="mt-1 text-gray-800">{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
             {order.items.map((item) => (
  <tr key={item._id} className="border-b">
    <td className="p-2">
      <div className="flex items-center">
        {/* Check if product is populated and has images */}
        {item.product?.images?.length > 0 ? (
          <img
            src={item.product.images[0]}
            alt={item.name}
            className="object-cover w-16 h-16 mr-2"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00IDE2bDQuNTg2LTQuNTg2YTIgMiAwIDAxMi44MjggMEwxNiAxNm0tMi0ybDEuNTg2LTEuNTg2YTIgMiAwIDAxMi44MjggMEwyMCAxNG0tNi02aC4wMU02IDIwaDEyYTIgMiAwIDAwMi0yVjZhMiAyIDAgMDAtMi0ySDZhMiAyIDAgMDAtMiAydjEyYTIgMiAwIDAwMiAyeiI+PC9wYXRoPjwvc3ZnPg==';
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-16 h-16 mr-2 bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500">${item.price}</div>
        </div>
      </div>
    </td>
    <td className="p-2 text-center">{item.qty}</td>
    <td className="p-2 text-center">${item.price}</td>
    <td className="p-2 text-center">${(item.price * item.qty).toFixed(2)}</td>
  </tr>
))}
              
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="3" className="px-6 py-3 text-sm font-medium text-right text-gray-500">
                  Total
                </td>
                <td className="px-6 py-3 text-sm font-bold text-gray-900">
                  ${order.totalPrice.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
//---------------------------------