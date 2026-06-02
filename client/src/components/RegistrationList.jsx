import { useState, useEffect } from 'react';
import { apiFetch } from '../api/api';

const RegistrationList = ({ eventId, onClose }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await apiFetch(`/events/${eventId}/registrations`);
        setRegistrations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, [eventId]);

  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <div className="modal-header">
          <h3>Registered Students</h3>
          <button onClick={onClose} className="btn-close">&times;</button>
        </div>
        
        {error && <p className="error-message">{error}</p>}
        {loading && <p>Loading...</p>}
        
        {!loading && !error && (
          <div className="registrations-list">
            {registrations.length === 0 ? (
              <p>No students registered yet.</p>
            ) : (
              <table style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map(r => (
                    <tr key={r.student_id}>
                      <td>{r.full_name}</td>
                      <td>{r.username}</td>
                      <td>{new Date(r.registered_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationList;
