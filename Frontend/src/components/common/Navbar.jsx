import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { FaUser, FaSignOutAlt, FaBell, FaComments } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications } = useSocket();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            FixMate
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {/* ⭐ Chat Button */}
                <Link
                  to="/chat"
                  className="text-gray-700 hover:text-primary-600"
                >
                  <FaComments size={20} />
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <FaBell className="text-xl text-gray-700 cursor-pointer" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </div>

                {/* Profile */}
                <Link
                  to={
                    user?.role === 'worker' || user?.type === 'worker'
                      ? '/worker/dashboard'
                      : '/user/dashboard'
                  }
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600"
                >
                  <FaUser />
                  <span>{user?.name}</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600"
                >
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline">
                  Login
                </Link>
                <Link to="/register/user" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
