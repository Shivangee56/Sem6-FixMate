import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import workerService from '../services/workerService';
import WorkerProfileForm from '../components/profile/WorkerProfileForm';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const WorkerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data } = await workerService.getWorkerById(user._id);
      setProfile(data.data);
    } catch (error) {
      setProfile(user);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await workerService.updateProfile(data);
      toast.success('Profile updated!');
      loadProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>
        <div className="card">
          <WorkerProfileForm worker={profile || user} onSubmit={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
