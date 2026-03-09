import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function WorkerDetails() {

  const { id } = useParams();
  const navigate = useNavigate();   // ⭐ navigation add
  const [worker, setWorker] = useState(null);

  useEffect(() => {

    axios.get(`http://localhost:5000/api/workers/${id}`)
      .then(res => {
        setWorker(res.data.data);
      })
      .catch(err => console.log(err));

  }, [id]);

  if (!worker) return <p>Loading...</p>;

  return (
    <div className="py-12 container-custom">

      <div className="max-w-xl mx-auto card">

        <h2 className="mb-2 text-3xl font-bold">{worker.name}</h2>

        <p className="mb-3 text-gray-600">
          Category: {worker.categories?.join(", ")}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 text-xl">★</span>
          <span className="font-semibold">{worker.rating?.average}</span>
          <span className="text-gray-500">
            ({worker.rating?.count} reviews)
          </span>
        </div>

        <p className="mb-4 text-lg font-bold text-primary-600">
          ₹{worker.pricing?.baseRate}/hour
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {worker.skills?.map((skill) => (
            <span key={skill.name} className="badge-info">
              {skill.name}
            </span>
          ))}
        </div>

        {/* ⭐ Hire Worker Button Functional */}
        <button
          onClick={() => navigate(`/jobs/create?workerId=${worker._id}`)}
          className="w-full btn-primary"
        >
          Hire Worker
        </button>

      </div>

    </div>
  );
}

export default WorkerDetails;