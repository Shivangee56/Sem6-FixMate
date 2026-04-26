import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ job, isWorker = false, onAccept }) => {
  const statusColors = {
    pending: 'badge-warning',
    assigned: 'badge-info',
    in_progress: 'badge-info',
    completed: 'badge-success',
    cancelled: 'badge-danger',
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </p>
        </div>
        <span className={`badge ${statusColors[job.status]}`}>{job.status}</span>
      </div>
      
      <p className="text-gray-700 mb-4">{job.description}</p>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold">Category:</span> {job.category}
        </div>
        {job.pricing?.estimatedBudget && (
          <div className="text-primary-600 font-bold">₹{job.pricing.estimatedBudget}</div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Link to={`/jobs/${job._id}`} className="btn-outline flex-1">View Details</Link>
        {isWorker && job.status === 'pending' && onAccept && (
          <button onClick={() => onAccept(job._id)} className="btn-primary flex-1">Accept Job</button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
