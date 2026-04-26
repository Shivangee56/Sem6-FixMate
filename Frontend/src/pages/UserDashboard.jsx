import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import jobService from '../services/jobService';
import JobCard from '../components/job/JobCard';
import Loading from '../components/common/Loading';
import workerService from '../services/workerService';

const UserDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    loadJobs();
    loadRecommendations();
  }, []);

  // Load user jobs
  const loadJobs = async () => {
    try {
      const { data } = await jobService.getJobs();
      setJobs(data.data || []);
      
      const active = data.data?.filter(j => ['pending', 'assigned', 'in_progress'].includes(j.status)).length || 0;
      const completed = data.data?.filter(j => j.status === 'completed').length || 0;
      
      setStats({ active, completed, total: data.data?.length || 0 });
    } catch (error) {
      console.error('Failed to load jobs', error);
    } finally {
      setLoading(false);
    }
  };

  // Load recommended workers
  const loadRecommendations = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await workerService.getRecommendations({
            category: "plumber", // Change dynamically later if needed
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            maxDistance: 5000,
            minRating: 3,
            maxBudget: 2000,
          });

          setRecommendations(res.data.workers || []);
        } catch (error) {
          console.error("Failed to load recommendations", error);
        }
      },
      (error) => {
        console.error("Location error:", error);
      }
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="py-12 container-custom">
      {/* Welcome + Create Job */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>
        <Link to="/jobs/create" className="btn-primary">Create New Job</Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <div className="card">
          <h3 className="mb-2 text-xl font-bold">Active Jobs</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.active}</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-xl font-bold">Completed</h3>
          <p className="text-3xl font-bold text-secondary-600">{stats.completed}</p>
        </div>
        <div className="card">
          <h3 className="mb-2 text-xl font-bold">Total Jobs</h3>
          <p className="text-3xl font-bold text-gray-600">{stats.total}</p>
        </div>
      </div>

      {/* 🔥 Recommended Workers Section */}
      {recommendations.length > 0 && (
        <div className="mb-8 card">
          <h2 className="mb-6 text-2xl font-bold">Recommended Workers Near You</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {recommendations.map((worker) => (
              <div
                key={worker._id}
                className="p-4 transition border rounded-lg shadow-sm hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{worker.name}</h3>
                <p className="mb-1 text-sm text-gray-600">
                  Category: {worker.categories?.join(", ")}
                </p>
                <p className="mb-1 font-semibold text-yellow-500">
                  ⭐ {worker.rating?.average || 0}
                </p>
                <p className="font-bold text-primary-600">
                  ₹{worker.pricing?.baseRate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Your Jobs Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Jobs</h2>
          <Link to="/workers" className="btn-outline">Find Workers</Link>
        </div>

        {jobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-gray-600">No jobs yet</p>
            <Link to="/jobs/create" className="btn-primary">Create Your First Job</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
