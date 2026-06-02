import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../api/api';
import EventCard from '../components/EventCard';

const StudentEvents = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [myRegs, setMyRegs] = useState([]);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null); // For registration specific errors

  const fetchData = async () => {
    try {
      const [eventsData, regsData] = await Promise.all([
        apiFetch('/events'),
        apiFetch('/my-registrations')
      ]);
      setEvents(eventsData);
      setMyRegs(regsData.map(r => r.id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegister = async (eventId) => {
    setApiError(null);
    try {
      await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify({ event_id: eventId })
      });
      // Refresh data
      fetchData();
    } catch (err) {
      // 409 and 400 errors come here
      setApiError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container">
      <nav>
        <h2>Student Events</h2>
        <div>
          <Link to="/my-registrations" className="nav-link" style={{marginRight: '15px'}}>My Registrations</Link>
          <span>Welcome, {user?.full_name}</span>
          <button onClick={handleLogout} className="btn-secondary" style={{marginLeft: '15px'}}>Logout</button>
        </div>
      </nav>
      <main>
        {error && <p className="error-message">{error}</p>}
        {apiError && <div className="alert alert-error" style={{marginBottom: '15px'}}>{apiError}</div>}
        
        <div className="event-list">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              isRegistered={myRegs.includes(event.id)}
              onRegister={handleRegister}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentEvents;
