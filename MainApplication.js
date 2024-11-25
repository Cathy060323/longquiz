import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList'; // Import the EmployeeList component
import TimeTracker from './TimeTracker'; // Import the TimeTracker component

const App = () => {
  // State to manage employee data
  const [employees, setEmployees] = useState([
    { name: 'Cathy', isClockedIn: false, lastTime: '', clockInTime: null, totalHours: 0 },
    { name: 'Alysa', isClockedIn: false, lastTime: '', clockInTime: null, totalHours: 0 },
    { name: 'Lim', isClockedIn: false, lastTime: '', clockInTime: null, totalHours: 0 },
  ]);

  // Function to handle clock-in and clock-out actions
  const handleStatusChange = (name, currentTime, timestamp) => {
    setEmployees((prevEmployees) => {
      return prevEmployees.map((employee) => {
        if (employee.name === name) {
          if (employee.isClockedIn) {
            // Calculate total hours worked when clocking out
            const workedTime = (currentTime - employee.clockInTime) / 1000 / 60 / 60; // Convert milliseconds to hours
            const newTotalHours = employee.totalHours + workedTime;

            return {
              ...employee,
              isClockedIn: false,
              lastTime: timestamp,
              clockInTime: null,
              totalHours: newTotalHours,
            };
          } else {
            // Clocking in: record the time
            return {
              ...employee,
              isClockedIn: true,
              lastTime: timestamp,
              clockInTime: currentTime,
            };
          }
        }
        return employee;
      });
    });
  };

  // Function to reset all tracking data
  const resetTracking = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => ({
        ...employee,
        isClockedIn: false,
        lastTime: '',
        clockInTime: null,
        totalHours: 0,
      }))
    );
  };

  // useEffect to log employee status changes in real-time (for debugging)
  useEffect(() => {
    const logEmployeeStatus = () => {
      employees.forEach((employee) => {
        if (employee.isClockedIn) {
          console.log(`${employee.name} is Clocked In`);
        } else {
          console.log(`${employee.name} is Clocked Out`);
        }
      });
    };

    logEmployeeStatus();
  }, [employees]); // Trigger effect when the employee data changes

  return (
    <div className="app container mx-auto p-4">
      {/* Render EmployeeList to display employee info */}
      <EmployeeList employees={employees} />

      {/* Render TimeTracker for each employee */}
      <div className="time-trackers mt-4">
        {employees.map((employee, index) => (
          <div key={index} className="employee-item mb-4">
            <h3 className="font-bold">{employee.name}</h3>
            <TimeTracker employee={employee} onStatusChange={handleStatusChange} />
          </div>
        ))}
      </div>

      {/* Reset button to clear all tracking */}
      <button
        onClick={resetTracking}
        className="btn bg-gray-500 mt-4 text-white p-2 rounded"
      >
        Reset All Tracking
      </button>
    </div>
  );
};

export default App;

