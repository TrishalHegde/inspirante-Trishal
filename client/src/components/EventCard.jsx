const EventCard = ({ event, isRegistered, onRegister }) => {
  const isFull = event.registered_count >= event.max_capacity;
  const spotsRemaining = event.max_capacity - event.registered_count;

  return (
    <div className="card event-card">
      <div className="event-header">
        <h4>{event.name}</h4>
        {isFull && <span className="badge badge-full">Full</span>}
      </div>
      <p><strong>Date:</strong> {event.event_date}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Spots Remaining:</strong> {spotsRemaining}</p>
      
      {onRegister && (
        <button 
          className="btn-primary" 
          disabled={isFull || isRegistered}
          onClick={() => onRegister(event.id)}
          style={{ marginTop: '10px' }}
        >
          {isRegistered ? 'Registered' : (isFull ? 'Sold Out' : 'Register')}
        </button>
      )}
    </div>
  );
};

export default EventCard;
