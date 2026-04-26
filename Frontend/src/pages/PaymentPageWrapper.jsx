import { useParams } from 'react-router-dom';
import PaymentPage from './PaymentPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentPageWrapper = () => {
  const { id } = useParams(); // job ID from URL
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}`);
        // Convert estimatedBudget to paise
        setAmount(data.data.pricing.estimatedBudget * 100);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p className="text-center py-12">Loading...</p>;

  return <PaymentPage jobId={id} amount={amount} />;
};

export default PaymentPageWrapper;