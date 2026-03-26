import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import jobService from '../services/jobService';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpInput, setOtpInput] = useState('');
  const [rating, setRating] = useState('');

  const isWorker = user?.role === 'worker';
  const isUser = user?.role === 'user';

  useEffect(() => {
    loadJob();
  }, [id]);

  // 🔁 auto refresh (live tracking)
  useEffect(() => {
    if (!job?._id) return;

    const interval = setInterval(() => {
      loadJob();
    }, 5000);

    return () => clearInterval(interval);
  }, [job?._id]);

  // 📍 worker live location update
  useEffect(() => {
    if (!isWorker || !job?._id) return;

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          await axios.post(
            `/api/jobs/${job._id}/update-location`,
            {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );
        } catch {}
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [job?._id, isWorker]);

  const loadJob = async () => {
    try {
      const { data } = await jobService.getJobById(id);
      setJob(data.data);
    } catch {
      toast.error('Failed to load job');
    } finally {
      setLoading(false);
    }
  };

  // OTP
  const handleVerifyOTP = async () => {
    try {
      if (!otpInput) return toast.error("Enter OTP");

      await axios.post(`/api/jobs/${id}/verify-otp`, { otp: otpInput }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      toast.success('OTP Verified ✅');
      setOtpInput('');
      loadJob();
    } catch {
      toast.error('Invalid OTP');
    }
  };

  // Complete job
  const handleComplete = async () => {
    await axios.post(`/api/jobs/${job._id}/complete`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    toast.success("Job Completed 🎉");
    loadJob();
  };

  // Payment
  const handlePayment = async () => {
    await axios.post(`/api/jobs/${job._id}/pay`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    toast.success("Payment Done 💰");
    loadJob();
  };

  // Rating
  const handleRating = async () => {
    if (!rating) return toast.error("Enter rating");

    await axios.post(`/api/jobs/${job._id}/rate`, { rating }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    toast.success("Rating submitted ⭐");
    setRating('');
  };

  if (loading) return <Loading />;
  if (!job) return <div className="text-center">Job not found</div>;

  return (
    <div className="container-custom py-12">
      <div className="card max-w-3xl mx-auto p-6 shadow-lg rounded-xl">

        <h1 className="text-3xl font-bold mb-3">{job.title}</h1>
        <p className="mb-4 text-gray-600">{job.description}</p>

        <div className="space-y-2">
          <p><b>Status:</b> {job.status}</p>
          <p><b>Budget:</b> ₹{job.pricing?.estimatedBudget}</p>
          <p><b>Payment:</b> {job.paymentMethod}</p>
        </div>

        {/* OTP display (USER) */}
        {isUser && job.otp && !job.otp.verified && (
          <div className="bg-green-100 p-4 mt-4 rounded">
            <p className="font-bold">OTP: {job.otp.code}</p>
          </div>
        )}

        {/* OTP input (WORKER) */}
        {isWorker && job.otp && !job.otp.verified && (
          <div className="mt-4">
            <input
              value={otpInput}
              onChange={(e) =>
                setOtpInput(e.target.value.replace(/[^0-9]/g, ''))
              }
              className="border p-2 w-full mb-2"
              placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOTP} className="btn-primary w-full">
              Verify OTP
            </button>
          </div>
        )}

        {/* COMPLETE */}
        {isWorker && job.status === 'in_progress' && (
          <button onClick={handleComplete} className="btn-primary mt-4 w-full">
            Mark as Completed ✅
          </button>
        )}

        {/* PAYMENT */}
        {isUser && job.status === 'completed' && !job.isPaid && (
          <button onClick={handlePayment} className="btn-primary mt-4 w-full">
            Pay Now 💰
          </button>
        )}

        {/* RATING */}
        {isUser && job.isPaid && (
          <div className="mt-4">
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Rate (1-5)"
            />
            <button onClick={handleRating} className="btn-primary w-full">
              Submit Rating ⭐
            </button>
          </div>
        )}

        {/* MAP */}
        {job.worker?.location?.coordinates && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">Live Location 📍</h3>

            <MapContainer
              center={[
                job.worker.location.coordinates[1],
                job.worker.location.coordinates[0]
              ]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  job.worker.location.coordinates[1],
                  job.worker.location.coordinates[0]
                ]}
              >
                <Popup>Worker is here 🚀</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobDetails;