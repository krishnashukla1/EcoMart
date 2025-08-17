
//-----------------
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

/*
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

const Payment = ({ orderId, config }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const orderRes = await API.post("/api/payments/order", { orderId }, config);
    const { amount, id: razorpayOrderId, currency } = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Razorpay key
      amount: amount.toString(),
      currency,
      order_id: razorpayOrderId,
      name: "Your Company",
      description: "Payment for order",
      handler: async function (response) {
        const verifyRes = await API.post(
          "/api/payments/verify",
          {
            orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
          config
        );

        if (verifyRes.data.success) {
          await API.put(
            `/api/orders/${orderId}/status`,
            { status: "Paid" },
            config
          );
          navigate(
            "/orders",
            { state: { paymentSuccess: true, paidOrderId: orderId }, replace: true }
          );
        } else {
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h1>Complete Payment</h1>
      <button onClick={handlePayment} className="px-4 py-2 text-white bg-blue-500 rounded">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
*/