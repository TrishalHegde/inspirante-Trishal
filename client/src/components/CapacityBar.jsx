const CapacityBar = ({ fillPercent }) => {
  let color = '#28a745'; // Green for < 50%
  if (fillPercent >= 50 && fillPercent < 80) {
    color = '#ffc107'; // Amber for 50-79%
  } else if (fillPercent >= 80) {
    color = '#dc3545'; // Red for >= 80%
  }

  // Cap at 100% for the visual bar
  const visualPercent = fillPercent > 100 ? 100 : fillPercent;

  return (
    <div className="capacity-bar-container" style={{ width: '100%', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden', height: '10px', marginTop: '5px' }}>
      <div 
        className="capacity-bar-fill" 
        style={{ 
          width: `${visualPercent}%`, 
          backgroundColor: color, 
          height: '100%',
          transition: 'width 0.3s ease'
        }} 
      />
    </div>
  );
};

export default CapacityBar;
