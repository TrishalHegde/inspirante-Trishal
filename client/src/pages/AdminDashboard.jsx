import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container">
      <nav>
        <h2>Admin Dashboard</h2>
        <div>
          <span>Welcome, {user?.full_name}</span>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </nav>
      <main>
        <p>Admin events view coming in Phase 5...</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
