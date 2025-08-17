import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import API from "../utils/api";

export default function PaymentPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };
        const { data } = await API.get(`/api/orders/${orderId}`, config);
        setOrder(data);
      } catch (err) {
        toast.error("Failed to load order details");
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      const paymentData = {
        orderId,
        amount: order?.totalPrice || 0,
        currency: "INR",
      };

      // 1. Process payment
      const { data } = await API.post("/api/payments", paymentData, config);

      if (data.success) {
        // 2. Update order status to 'Paid'
        await API.put(
          `/api/orders/${orderId}/status`,
          { status: 'Paid' },
          config
        );

        toast.success("Payment completed successfully!");
        
        // 3. Redirect back to orders with success state
        navigate('/orders', { 
          state: { 
            paymentSuccess: true,
            paidOrderId: orderId 
          },
          replace: true
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Payment Page</h1>
      {order ? (
        <div className="p-4 bg-gray-100 rounded">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <button
            onClick={handlePayment}
            className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
            disabled={order.status === 'Paid'}
          >
            {order.status === 'Paid' ? 'Payment Completed' : 'Pay Now'}
          </button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
}