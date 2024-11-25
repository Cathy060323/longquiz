import React from 'react';


const EmployeeList = ({ employees }) => {
  return (
    <div className="employee-list">
      <h2 className="text-xl font-bold mb-4">Employee Time Tracking</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index} className="border-b p-2">
            <strong>{employee.name}</strong> - 
            {employee.isClockedIn ? 'Clocked In' : 'Clocked Out'} 
            {employee.lastTime && ` at ${employee.lastTime}`}
            <div>
              Total Hours Worked: {employee.totalHours ? employee.totalHours.toFixed(2) : '0.00'} hours
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;

