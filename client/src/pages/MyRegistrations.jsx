import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const MyRegistrations = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container">
      <nav>
        <h2>My Registrations</h2>
        <div>
          <Link to="/student" style={{marginRight: '15px'}}>All Events</Link>
          <span>Welcome, {user?.full_name}</span>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </nav>
      <main>
        <p>My Registrations view coming in Phase 6...</p>
      </main>
    </div>
  );
};

export default MyRegistrations;
