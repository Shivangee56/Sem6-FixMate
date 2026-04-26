import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterUser = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Required'),
      password: Yup.string().min(6).required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...data } = values;
        await register(data, 'user');
        navigate('/user/dashboard');
      } catch (error) {
        toast.error('Registration failed');
      }
    },
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full card">
        <h2 className="text-3xl font-bold text-center mb-6">Register as User</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" {...formik.getFieldProps('name')} className="input-field" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" {...formik.getFieldProps('email')} className="input-field" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input type="tel" {...formik.getFieldProps('phone')} className="input-field" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" {...formik.getFieldProps('password')} className="input-field" />
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input type="password" {...formik.getFieldProps('confirmPassword')} className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full">Register</button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
