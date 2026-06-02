import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../api/api';

const MyRegistrations = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyRegs = async () => {
      try {
        const data = await apiFetch('/my-registrations');
        setRegistrations(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMyRegs();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container">
      <nav>
        <h2>My Registrations</h2>
        <div>
          <Link to="/student" className="nav-link" style={{marginRight: '15px'}}>All Events</Link>
          <span>Welcome, {user?.full_name}</span>
          <button onClick={handleLogout} className="btn-secondary" style={{marginLeft: '15px'}}>Logout</button>
        </div>
      </nav>
      <main>
        {error && <p className="error-message">{error}</p>}
        
        {registrations.length === 0 && !error ? (
          <p>You have not registered for any events yet.</p>
        ) : (
          <div className="event-list">
            {registrations.map(event => (
              <div key={event.id} className="card event-card">
                <div className="event-header">
                  <h4>{event.name}</h4>
                  <span className="badge badge-success">Registered</span>
                </div>
                <p><strong>Date:</strong> {event.event_date}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyRegistrations;
