import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    userLogOut();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-lg font-bold mb-4 md:mb-0">
          <img
            className="w-16"
            src="https://i.ibb.co/hZ1kk4K/1.png"
            alt="Logo"
          />
        </Link>

        {/* User Section or Login/Register */}

        {user ? (
          // User Section
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/assignments" className="text-white">
              Assignments
            </Link>
            <Link to="/create-assignments" className="text-white">
              Create Assignments
            </Link>

            <Link to="/submitted-assignments" className="text-white">
              Submitted Assignments
            </Link>
            <Link to="/my-assignment-page" className="text-white">
              My Assignment Page
            </Link>
            {/* User Image */}
            <div className="relative group">
              <img
                src={user?.photoURL} // Replace with the actual path to the user image
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <div className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-md shadow-md">
                <span className="text-gray-800">{user?.displayName}</span>
              </div>
            </div>

            {/* Logout Button */}
            <button className="text-white" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        ) : (
          // Login/Register
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/assignments" className="text-white">
              Assignments
            </Link>

            <Link to="/login" className="text-white">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
