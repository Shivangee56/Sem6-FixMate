import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import jobService from '../services/jobService';
import ratingService from '../services/ratingService';
import RatingForm from '../components/rating/RatingForm';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const { data } = await jobService.getJobById(id);
      setJob(data.data);
    } catch (error) {
      toast.error('Failed to load job');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      await jobService.completeJob(id);
      toast.success('Job completed!');
      setShowRating(true);
      loadJob();
    } catch (error) {
      toast.error('Failed to complete job');
    }
  };

  const handleRatingSubmit = async (ratingData) => {
    try {
      await ratingService.createRating({
        job: id,
        worker: job.worker._id || job.worker,
        ...ratingData,
      });
      toast.success('Rating submitted!');
      setShowRating(false);
      navigate('/user/dashboard');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  if (loading) return <Loading />;
  if (!job) return <div className="py-12 text-center">Job not found</div>;

  const statusColors = {
    pending: 'badge-warning',
    assigned: 'badge-info',
    accepted: 'badge-info',
    in_progress: 'badge-info',
    completed: 'badge-success',
    cancelled: 'badge-danger',
  };

  const isWorker = user?.role === 'worker' || user?.type === 'worker';
  const isUser = user?.role === 'user' || user?.type === 'user';

  const canComplete = isWorker && job.status === 'in_progress';
  const canRate = !isWorker && job.status === 'completed' && !job.rated;

  return (
    <div className="py-12 container-custom">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{job.title}</h1>
              <p className="text-gray-500">
                Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
              </p>
            </div>
            <span className={`badge ${statusColors[job.status]}`}>{job.status}</span>
          </div>

          <div className="space-y-4">

            <div>
              <h3 className="mb-2 text-lg font-bold">Description</h3>
              <p className="text-gray-700">{job.description}</p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold">Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="font-semibold">Category:</span> {job.category}
                </div>

                {job.pricing?.estimatedBudget && (
                  <div>
                    <span className="font-semibold">Budget:</span> ₹{job.pricing.estimatedBudget}
                  </div>
                )}

                {job.scheduledDate && (
                  <div>
                    <span className="font-semibold">Scheduled:</span>{' '}
                    {new Date(job.scheduledDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            {job.worker && (
              <div>
                <h3 className="mb-2 text-lg font-bold">Worker</h3>
                <p>{job.worker.name || 'Assigned'}</p>
              </div>
            )}

            {/* 🔐 OTP Display Only For User */}
            {isUser && job.otp && !job.otp.verified && (
              <div className="p-4 border border-green-300 rounded-lg bg-green-50">
                <h3 className="mb-2 text-lg font-bold">Worker Verification OTP</h3>
                <p className="text-3xl font-bold tracking-widest text-green-600">
                  {job.otp.code}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Share this OTP with the worker when they arrive to start the job.
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-4">

              {canComplete && (
                <button onClick={handleComplete} className="btn-primary">
                  Mark as Completed
                </button>
              )}

              {canRate && !showRating && (
                <button onClick={() => setShowRating(true)} className="btn-primary">
                  Rate Worker
                </button>
              )}

            </div>

            {showRating && (
              <div className="pt-6 mt-6 border-t">
                <h3 className="mb-4 text-lg font-bold">Rate This Job</h3>
                <RatingForm onSubmit={handleRatingSubmit} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;