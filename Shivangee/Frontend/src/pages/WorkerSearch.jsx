import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import workerService from '../services/workerService';
import Loading from '../components/common/Loading';

const WorkerSearch = () => {

  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    try {
      const { data } = await workerService.getWorkers();
      setWorkers(data.data || []);
    } catch (error) {
      console.error('Failed to load workers', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkers = filter
    ? workers.filter((w) => w.categories?.includes(filter))
    : workers;

  if (loading) return <Loading />;

  return (
    <div className="py-12 container-custom">
      <h1 className="mb-8 text-4xl font-bold">Find Workers</h1>

      <div className="mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md input-field"
        >
          <option value="">All Categories</option>
          {['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Cleaner', 'AC Repair', 'Appliance Repair', 'Pest Control'].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredWorkers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">

          {filteredWorkers.map((worker) => (

            <div
              key={worker._id}
              onClick={() => navigate(`/worker/${worker._id}`)}
              className="transition-shadow cursor-pointer card hover:shadow-lg"
            >

              <h3 className="mb-2 text-xl font-bold">{worker.name}</h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{worker.rating?.average || 0}</span>
                <span className="text-gray-500">({worker.rating?.count || 0} reviews)</span>
              </div>

              {worker.bio && (
                <p className="mb-4 text-gray-700">{worker.bio}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {worker.categories?.map((cat) => (
                  <span key={cat} className="badge-info">{cat}</span>
                ))}
              </div>

              {worker.pricing?.baseRate && (
                <p className="font-bold text-primary-600">
                  ₹{worker.pricing.baseRate}/hour
                </p>
              )}

            </div>

          ))}

        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-600">No workers found</p>
        </div>
      )}

    </div>
  );
};

export default WorkerSearch;