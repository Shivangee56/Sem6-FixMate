import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserProfileForm = ({ user, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Required'),
    }),
    onSubmit: (values) => {
      onSubmit({
        name: values.name,
        phone: values.phone,
        address: {
          street: values.address,
          city: values.city,
          state: values.state,
        }
      });
    },
  });

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
        <label className="label">Address</label>
        <input type="text" {...formik.getFieldProps('address')} className="input-field" placeholder="Street address" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">City</label>
          <input type="text" {...formik.getFieldProps('city')} className="input-field" />
        </div>
        <div>
          <label className="label">State</label>
          <input type="text" {...formik.getFieldProps('state')} className="input-field" />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full">Save Changes</button>
    </form>
  );
};

export default UserProfileForm;
