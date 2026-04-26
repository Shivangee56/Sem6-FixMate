import { useNavigate, useSearchParams } from 'react-router-dom';
import jobService from '../services/jobService';
import JobForm from '../components/job/JobForm';
import toast from 'react-hot-toast';

const CreateJob = () => {

  const navigate = useNavigate();

  // ⭐ URL se workerId read karna
  const [searchParams] = useSearchParams();
  const workerId = searchParams.get("workerId");

  const handleSubmit = async (values) => {

    try {

      await jobService.createJob({
        ...values,
        workerId: workerId,   // ⭐ workerId send
        pricing: { estimatedBudget: values.estimatedBudget },
        location: { coordinates: [0, 0] }
      });

      toast.success('Job created successfully!');
      navigate('/user/dashboard');

    } catch (error) {
      toast.error('Failed to create job');
    }
  };

  return (
    <div className="container-custom py-12">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Create New Job
        </h1>

        <div className="card">
          <JobForm onSubmit={handleSubmit} />
        </div>

      </div>

    </div>
  );
};

export default CreateJob;
