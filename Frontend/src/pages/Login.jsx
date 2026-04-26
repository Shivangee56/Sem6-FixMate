import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [userType, setUserType] = useState('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await login(values, userType);
        navigate(userType === 'user' ? '/user/dashboard' : '/worker/dashboard');
      } catch (error) {
        toast.error('Login failed');
      }
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full card">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <div className="flex gap-2 mb-6">
          <button type="button" onClick={() => setUserType('user')} className={`flex-1 py-3 rounded-lg font-semibold ${userType === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}>User</button>
          <button type="button" onClick={() => setUserType('worker')} className={`flex-1 py-3 rounded-lg font-semibold ${userType === 'worker' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}>Worker</button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input type="email" {...formik.getFieldProps('email')} className="input-field" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" {...formik.getFieldProps('password')} className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>

        <p className="text-center mt-4">
          Don't have an account? <Link to={`/register/${userType}`} className="text-primary-600 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
