import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterWorker = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'AC Repair', 'Appliance Repair', 'Pest Control'];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      categories: [],
      bio: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Required'),
      password: Yup.string().min(6).required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
      categories: Yup.array().min(1, 'Select at least one category').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...data } = values;
        await register(data, 'worker');
        navigate('/worker/dashboard');
      } catch (error) {
        toast.error('Registration failed');
      }
    },
  });

  const toggleCategory = (cat) => {
    const current = formik.values.categories;
    if (current.includes(cat)) {
      formik.setFieldValue('categories', current.filter((c) => c !== cat));
    } else {
      formik.setFieldValue('categories', [...current, cat]);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full card">
        <h2 className="text-3xl font-bold text-center mb-6">Register as Worker</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input type="text" {...formik.getFieldProps('name')} className="input-field" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input type="tel" {...formik.getFieldProps('phone')} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" {...formik.getFieldProps('email')} className="input-field" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Password</label>
              <input type="password" {...formik.getFieldProps('password')} className="input-field" />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input type="password" {...formik.getFieldProps('confirmPassword')} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Categories</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`py-2 px-4 rounded-lg font-semibold ${
                    formik.values.categories.includes(cat)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Bio (Optional)</label>
            <textarea {...formik.getFieldProps('bio')} rows="3" className="input-field" />
          </div>
          <button type="submit" className="btn-primary w-full">Register as Worker</button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterWorker;
