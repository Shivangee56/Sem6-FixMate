import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import UserProfileForm from '../components/profile/UserProfileForm';
import Loading from '../components/common/Loading';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await userService.getProfile();
      setProfile(data.data);
    } catch (error) {
      setProfile(user);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await userService.updateProfile(data);
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
          <UserProfileForm user={profile || user} onSubmit={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
