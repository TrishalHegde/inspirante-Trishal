import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/api';
import EventForm from '../components/EventForm';
import CapacityBar from '../components/CapacityBar';
import RegistrationList from '../components/RegistrationList';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await apiFetch('/events');
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
          <button onClick={handleLogout} className="btn-secondary" style={{marginLeft: '15px'}}>Logout</button>
        </div>
      </nav>
      
      <main className="dashboard-grid">
        <div className="events-section">
          <h3>All Events</h3>
          {error && <p className="error-message">{error}</p>}
          
          <div className="event-list">
            {events.map(event => (
              <div key={event.id} className="card event-card">
                <div className="event-header">
                  <h4>{event.name}</h4>
                  <button 
                    onClick={() => setSelectedEventId(event.id)}
                    className="btn-text"
                  >
                    View Registrations
                  </button>
                </div>
                <p><strong>Date:</strong> {event.event_date}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <div className="capacity-info">
                  <span>{event.registered_count} / {event.max_capacity} Registered</span>
                  <span>{Math.round(event.fill_percent)}%</span>
                </div>
                <CapacityBar fillPercent={event.fill_percent} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="sidebar">
          <EventForm onEventCreated={fetchEvents} />
        </div>
      </main>

      {selectedEventId && (
        <RegistrationList 
          eventId={selectedEventId} 
          onClose={() => setSelectedEventId(null)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
