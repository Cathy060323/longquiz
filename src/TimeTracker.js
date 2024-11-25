import React, { useState } from "react";
import EmployeeList from "./EmployeeList";

const TimeTracker = () => {
  const [employees, setEmployees] = useState([
    { name: "Cathy", isClockedIn: false, lastRecordedTime: null },
    { name: "Alysa", isClockedIn: false, lastRecordedTime: null },
    { name: "Lim", isClockedIn: false, lastRecordedTime: null }
  ]);

  const toggleClockStatus = (index) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee, idx) => {
        if (idx === index) {
          const now = new Date().toLocaleTimeString();
          return {
            ...employee,
            isClockedIn: !employee.isClockedIn,
            lastRecordedTime: employee.isClockedIn ? null : now,
          };
        }
        return employee;
      })
    );
  };

  return (
    <div>
      <h1>Employee Time Tracker</h1>
      <EmployeeList employees={employees} onToggleClock={toggleClockStatus} />
    </div>
  );
};

export default TimeTracker;
