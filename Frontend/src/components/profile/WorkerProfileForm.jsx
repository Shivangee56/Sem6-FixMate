import { useFormik } from 'formik';
import * as Yup from 'yup';

const WorkerProfileForm = ({ worker, onSubmit }) => {
  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'AC Repair', 'Appliance Repair', 'Pest Control'];

  const formik = useFormik({
    initialValues: {
      name: worker?.name || '',
      phone: worker?.phone || '',
      bio: worker?.bio || '',
      categories: worker?.categories || [],
      baseRate: worker?.pricing?.baseRate || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Required'),
      categories: Yup.array().min(1, 'Select at least one').required('Required'),
    }),
    onSubmit,
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
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="label">Full Name</label>
        <input type="text" {...formik.getFieldProps('name')} className="input-field" />
      </div>

      <div>
        <label className="label">Phone</label>
        <input type="tel" {...formik.getFieldProps('phone')} className="input-field" />
      </div>

      <div>
        <label className="label">Bio</label>
        <textarea {...formik.getFieldProps('bio')} rows="3" className="input-field" placeholder="Tell clients about yourself..." />
      </div>

      <div>
        <label className="label">Categories</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`py-2 px-4 rounded-lg font-semibold transition-all ${
                formik.values.categories.includes(cat)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Base Rate (₹/hour)</label>
        <input type="number" {...formik.getFieldProps('baseRate')} className="input-field" />
      </div>

      <button type="submit" className="btn-primary w-full">Save Changes</button>
    </form>
  );
};

export default WorkerProfileForm;
