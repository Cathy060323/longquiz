import React from "react";

const EmployeeList = ({ employees, onToggleClock }) => (
  <div>
    <h2>Employee List</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Last Recorded Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.isClockedIn ? "Clocked In" : "Clocked Out"}</td>
            <td>{employee.lastRecordedTime || "N/A"}</td>
            <td>
              <button onClick={() => onToggleClock(index)}>
                {employee.isClockedIn ? "Clock Out" : "Clock In"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeList;
