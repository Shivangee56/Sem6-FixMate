import { useFormik } from 'formik';
import * as Yup from 'yup';

const JobForm = ({ onSubmit, initialValues = {} }) => {
  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'AC Repair', 'Appliance Repair', 'Pest Control'];

  const formik = useFormik({
    initialValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      category: initialValues.category || '',
      estimatedBudget: initialValues.estimatedBudget || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      estimatedBudget: Yup.number().min(1, 'Must be greater than 0').required('Required'),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label className="label">Job Title</label>
        <input type="text" {...formik.getFieldProps('title')} className={`input-field ${formik.touched.title && formik.errors.title ? 'input-error' : ''}`} />
        {formik.touched.title && formik.errors.title && <p className="error-text">{formik.errors.title}</p>}
      </div>

      <div>
        <label className="label">Description</label>
        <textarea {...formik.getFieldProps('description')} rows="4" className={`input-field ${formik.touched.description && formik.errors.description ? 'input-error' : ''}`} />
        {formik.touched.description && formik.errors.description && <p className="error-text">{formik.errors.description}</p>}
      </div>

      <div>
        <label className="label">Category</label>
        <select {...formik.getFieldProps('category')} className={`input-field ${formik.touched.category && formik.errors.category ? 'input-error' : ''}`}>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && <p className="error-text">{formik.errors.category}</p>}
      </div>

      <div>
        <label className="label">Estimated Budget (₹)</label>
        <input type="number" {...formik.getFieldProps('estimatedBudget')} className={`input-field ${formik.touched.estimatedBudget && formik.errors.estimatedBudget ? 'input-error' : ''}`} />
        {formik.touched.estimatedBudget && formik.errors.estimatedBudget && <p className="error-text">{formik.errors.estimatedBudget}</p>}
      </div>

      <button type="submit" disabled={formik.isSubmitting} className="btn-primary w-full">
        {formik.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default JobForm;
