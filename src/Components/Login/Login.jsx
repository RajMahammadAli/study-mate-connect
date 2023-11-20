import React, { useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export default function () {
  const { googleSignIn, userSignIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    userSignIn(email, password)
      .then((result) => {
        e.target.reset();

        toast("Log In Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setErrorMessage("Invalid email or password. Please try again.");
        console.log(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("Log In Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Log In
        </h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-md p-2"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-md p-2"
              name="password"
              required
            />
          </div>
          <p className="text-red-700 mb-4">{errorMessage}</p>
          <button className="bg-blue-500 text-white w-full rounded-md py-2 hover:bg-blue-600 transition duration-300">
            Log In
          </button>
        </form>
        <p className="text-gray-700 mt-4 text-center">
          New Here?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
        <p className="text-gray-700 text-center mt-2">or Sign Up using</p>
        <div
          onClick={handleGoogleSignIn}
          className="cursor-pointer text-center mt-2"
        >
          <img
            className="w-10 mx-auto"
            src="https://i.ibb.co/hCFKf5k/google-icon-2048x2048-czn3g8x8-removebg-preview.png"
            alt="Google Icon"
          />
        </div>
      </div>
    </div>
  );
}
