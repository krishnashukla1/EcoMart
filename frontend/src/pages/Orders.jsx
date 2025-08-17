import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import API from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchOrders = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      // const { data } = await API.get('/api/orders', config);
      const { data } = await API.get('/api/orders', config);
      
      setOrders(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching orders');
    }
  };

  // Fetch orders on component mount and when location state indicates refresh
  useEffect(() => {
    fetchOrders();
    
    // Check for payment success
  if (location.state?.paymentSuccess) {
    toast.success(`Payment for order ${location.state.paidOrderId} completed!`);
    // Clear the state
    navigate('.', { replace: true, state: {} });
  }
}, [location.key]); // Refresh when location changes

  const handlePayment = (orderId) => {
    navigate(`/payment/${orderId}`, {
      state: { fromOrders: true } // Flag that we came from orders page
    });
  };

  const handleMarkAsCompleted = async (orderId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await API.put(
        `/api/orders/${orderId}/status`, 
        { status: 'Completed' },
        config
      );
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'Completed' } : order
      ));
      toast.success('Order marked as Completed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating order');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await API.delete(`/api/orders/${orderId}`, config);
      setOrders(orders.filter(order => order._id !== orderId));
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting order');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <Link
          to="/products"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue Shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="max-w-xs text-sm font-medium text-gray-900 truncate">
                        {order._id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                      <Link
                        to={`/orders/${order._id}`}
                        className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Details
                      </Link>

                      {order.status === 'Pending' && (
                        <button
                          onClick={() => handlePayment(order._id)}
                          className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Pay Now
                        </button>
                      )}

                      {order.status === 'Paid' && (
                        <button
                          onClick={() => handleMarkAsCompleted(order._id)}
                          className="px-3 py-1 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Complete
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;