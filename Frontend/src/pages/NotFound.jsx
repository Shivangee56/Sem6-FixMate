import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[80vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-primary-600">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
