import { useState } from 'react';
import { apiFetch } from '../api/api';

const EventForm = ({ onEventCreated }) => {
  const [name, setName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !eventDate || !venue || !capacity) {
      setError("All fields are required");
      return;
    }

    try {
      await apiFetch('/events', {
        method: 'POST',
        body: JSON.stringify({
          name,
          event_date: eventDate,
          venue,
          max_capacity: parseInt(capacity, 10)
        })
      });
      
      // Reset form
      setName('');
      setEventDate('');
      setVenue('');
      setCapacity('');
      
      // Notify parent to refresh list
      if (onEventCreated) onEventCreated();
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card event-form">
      <h3>Create New Event</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Venue</label>
          <input type="text" value={venue} onChange={e => setVenue(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Max Capacity</label>
          <input type="number" min="1" value={capacity} onChange={e => setCapacity(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
