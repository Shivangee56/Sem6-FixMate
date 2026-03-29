import { Link } from 'react-router-dom';
import { FaWrench, FaUserShield, FaClock, FaStar } from 'react-icons/fa';
import WorkerFinderChatbotPage from './Chat';

const Home = () => {
  const features = [
    { icon: <FaWrench className="text-4xl text-primary-600" />, title: 'Skilled Workers', description: 'Find verified professionals for all your needs' },
    { icon: <FaUserShield className="text-4xl text-primary-600" />, title: 'Verified Profiles', description: 'All workers are background checked' },
    { icon: <FaClock className="text-4xl text-primary-600" />, title: 'Quick Response', description: 'Get workers at your doorstep within hours' },
    { icon: <FaStar className="text-4xl text-primary-600" />, title: 'Rated Service', description: 'Choose based on ratings and reviews' },
  ];

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning', 'AC Repair', 'Appliance Repair', 'Pest Control'];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Find Skilled Workers Instantly</h1>
          <p className="text-xl mb-8">Connect with verified professionals for all your home service needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register/user" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg">Find Workers</Link>
            <Link to="/register/worker" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 text-lg">Become a Worker</Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose FixMate?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="card text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <div key={i} className="card text-center hover:bg-primary-50 cursor-pointer">
                <p className="font-semibold">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
