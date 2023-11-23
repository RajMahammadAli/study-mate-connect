import React from "react";

const CounterSection = () => {
  // Set static counter values
  const usersCount = 1000;
  const projectsCompleted = 50;
  const happyCustomers = 500;

  return (
    <div className="flex flex-col md:flex-row justify-around bg-gray-100 p-8 rounded-lg shadow-md my-8">
      <div className="text-center mb-8 md:mb-0">
        <h2 className="text-4xl font-bold text-gray-800">Our Achievements</h2>
        <p className="text-lg text-gray-600">Numbers that make us proud</p>
      </div>
      <div className="text-center p-4 bg-white border border-gray-200 rounded-md transition-transform hover:scale-105 mb-4 md:mb-0">
        <h3 className="text-gray-700 text-lg font-semibold">Happy Users</h3>
        <p className="text-blue-600 text-2xl font-bold">{usersCount}</p>
      </div>
      <div className="text-center p-4 bg-white border border-gray-200 rounded-md transition-transform hover:scale-105 mb-4 md:mb-0">
        <h3 className="text-gray-700 text-lg font-semibold">
          Projects Completed
        </h3>
        <p className="text-green-600 text-2xl font-bold">{projectsCompleted}</p>
      </div>
      <div className="text-center p-4 bg-white border border-gray-200 rounded-md transition-transform hover:scale-105">
        <h3 className="text-gray-700 text-lg font-semibold">
          Satisfied Customers
        </h3>
        <p className="text-purple-600 text-2xl font-bold">{happyCustomers}</p>
      </div>
    </div>
  );
};

export default CounterSection;
