import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import jobService from '../services/jobService';
import JobCard from '../components/job/JobCard';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [availableJobs, setAvailableJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [stats, setStats] = useState({ available: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const { data } = await jobService.getJobs();
      const all = data.data || [];
      
      const available = all.filter(j => j.status === 'pending');
      const mine = all.filter(j => j.worker?._id === user?._id || j.worker === user?._id);
      const inProgress = mine.filter(j => j.status === 'in_progress').length;
      const completed = mine.filter(j => j.status === 'completed').length;
      
      setAvailableJobs(available);
      setMyJobs(mine);
      setStats({ available: available.length, inProgress, completed });
    } catch (error) {
      console.error('Failed to load jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async (jobId) => {
    try {
      await jobService.acceptJob(jobId);
      toast.success('Job accepted!');
      loadJobs();
    } catch (error) {
      toast.error('Failed to accept job');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}!</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Available Jobs</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.available}</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-secondary-600">{stats.completed}</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Rating</h3>
          <p className="text-3xl font-bold text-gray-600">{user?.rating?.average || 0}⭐</p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
        {availableJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {availableJobs.map((job) => (
              <JobCard key={job._id} job={job} isWorker={true} onAccept={handleAcceptJob} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No jobs available right now</p>
        )}
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">My Jobs</h2>
        {myJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {myJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No accepted jobs yet</p>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
