import React from 'react';

 
const TimeTracker = ({ employee, onStatusChange }) => {

  // Function to handle clocking in and out
  const handleClockToggle = () => {
    const currentTime = new Date();
    const timestamp = currentTime.toLocaleTimeString();
    onStatusChange(employee.name, currentTime, timestamp);
  };

  return (
    <div className="time-tracker mb-4">
      <button
        onClick={handleClockToggle}
        className={`btn ${employee.isClockedIn ? 'bg-red-500' : 'bg-green-500'} text-white p-2 rounded`}
      >
        {employee.isClockedIn ? 'Clock Out' : 'Clock In'}
      </button>
    </div>
  );
};

export default TimeTracker;

