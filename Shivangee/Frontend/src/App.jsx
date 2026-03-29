import ChatPage from './pages/ChatPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import RegisterWorker from './pages/RegisterWorker';
import UserDashboard from './pages/UserDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import UserProfile from './pages/UserProfile';
import WorkerProfile from './pages/WorkerProfile';
import WorkerSearch from './pages/WorkerSearch';
import CreateJob from './pages/CreateJob';
import JobDetails from './pages/JobDetails';
import NotFound from './pages/NotFound';
import WorkerDetails from './pages/WorkerDetails';

/* ⭐ NEW: Payment Page Wrapper */
import PaymentPageWrapper from './pages/PaymentPageWrapper';
import FixMateSupportPage from './pages/Chat';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/user" element={<RegisterUser />} />
                <Route path="/register/worker" element={<RegisterWorker />} />

                <Route path="/user/dashboard" element={<PrivateRoute role="user"><UserDashboard /></PrivateRoute>} />
                <Route path="/user/profile" element={<PrivateRoute role="user"><UserProfile /></PrivateRoute>} />

                <Route path="/workers" element={<PrivateRoute role="user"><WorkerSearch /></PrivateRoute>} />
                <Route path="/worker/:id" element={<PrivateRoute role="user"><WorkerDetails /></PrivateRoute>} />

                <Route path="/jobs/create" element={<PrivateRoute role="user"><CreateJob /></PrivateRoute>} />
                <Route path="/jobs/:id" element={<PrivateRoute><JobDetails /></PrivateRoute>} />

                <Route path="/jobs/:id/payment" element={<PrivateRoute><PaymentPageWrapper /></PrivateRoute>} />

                <Route path="/chat" element={<PrivateRoute><FixMateSupportPage /></PrivateRoute>} />
                <Route path="/worker/dashboard" element={<PrivateRoute role="worker"><WorkerDashboard /></PrivateRoute>} />
                <Route path="/worker/profile" element={<PrivateRoute role="worker"><WorkerProfile /></PrivateRoute>} />
                {/* <WorkerFinderChatbotPage/> */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;