import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PaymentPage = ({ jobId, amount }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post(
        '/api/payments/create-order',
        { amount }, // backend expects amount in paise (₹1 = 100 paise)
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const { order } = data; // order object from backend

      // 2️⃣ Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Put your Razorpay Key in .env
        amount: order.amount,
        currency: order.currency,
        name: 'Your Platform Name',
        description: 'Payment for Job',
        order_id: order.id,
        handler: async function (response) {
          // 3️⃣ Verify payment on backend
          try {
            await axios.post(
              '/api/payments/verify-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                jobId,
              },
              {
                headers: { Authorization: `Bearer ${user?.token}` },
              }
            );
            toast.success('Payment successful!');
          } catch (err) {
            console.error(err);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: '#2563eb' }, // Primary blue
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error('Payment failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Complete Payment</h1>
      <p className="mb-4 text-gray-700">
        Amount to pay: <span className="font-bold text-primary-600">₹{amount / 100}</span>
      </p>
      <button
        onClick={handlePayment}
        className="btn-primary"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentPage;