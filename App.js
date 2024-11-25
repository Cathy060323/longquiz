import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList'; // Import EmployeeList component
import TimeTracker from './TimeTracker'; // Import TimeTracker component

const App = () => {
  // Initialize state with employees' information
  const [employees, setEmployees] = useState([
    { name: 'Cathy', isClockedIn: false, lastTime: '', clockInTime: null, totalHours: 0 },
    { name: 'Alysa', isClockedIn: false, lastTime: '', clockInTime: null, totalHours: 0 },
    { name: 'Lim', isClockedIn: false, lastTime: '', clockInTime: null, totalHours: 0 },
  ]);

  // Function to handle clocking in and clocking out
  const handleStatusChange = (name, currentTime, timestamp) => {
    setEmployees((prevEmployees) => {
      return prevEmployees.map((employee) => {
        if (employee.name === name) {
          if (employee.isClockedIn) {
            // If employee is clocked in, calculate total hours when they clock out
            const workedTime = (currentTime - employee.clockInTime) / 1000 / 60 / 60; // Convert ms to hours
            const newTotalHours = employee.totalHours + workedTime;

            return {
              ...employee,
              isClockedIn: false,
              lastTime: timestamp,
              clockInTime: null,
              totalHours: newTotalHours,
            };
          } else {
            // If employee is clocked out, mark them as clocked in
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

  // Function to reset all employee time tracking
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
  }, [employees]); 

  return (
    <div className="app container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Time Tracker</h1>
      
      {/* Render EmployeeList component to show employee details */}
      <EmployeeList employees={employees} />

      {/* Render TimeTracker for each employee to manage clock in/out */}
      <div className="time-trackers mt-4">
        {employees.map((employee, index) => (
          <div key={index} className="employee-item mb-4">
            <h3 className="font-bold">{employee.name}</h3>
            <TimeTracker employee={employee} onStatusChange={handleStatusChange} />
          </div>
        ))}
      </div>

      {/* Button to reset all employee tracking */}
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

