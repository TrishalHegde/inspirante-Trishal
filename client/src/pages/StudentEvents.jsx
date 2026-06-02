import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const StudentEvents = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container">
      <nav>
        <h2>Student Events</h2>
        <div>
          <Link to="/my-registrations" style={{marginRight: '15px'}}>My Registrations</Link>
          <span>Welcome, {user?.full_name}</span>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </nav>
      <main>
        <p>Student events view coming in Phase 6...</p>
      </main>
    </div>
  );
};

export default StudentEvents;
