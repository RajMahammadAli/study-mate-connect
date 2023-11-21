import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

export default function () {
  const { user } = useContext(AuthContext);
  const email = user.email;

  const [startDate, setStartDate] = useState(new Date());

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    marks: 0,
    thumbnailImageUrl: "",
    difficultyLevel: "easy",
    dueDate: new Date(),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData({ ...assignmentData, [name]: value, email });
  };
  const handleDateChange = (date) => {
    setAssignmentData({ ...assignmentData, dueDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/assignments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(assignmentData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Assignments added successfully");
        navigate(location?.state ? location.state : "/");
      });

    console.log(assignmentData);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4">Create Assignment</h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={assignmentData.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={assignmentData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>

            {/* Marks */}
            <div className="mb-4">
              <label
                htmlFor="marks"
                className="block text-gray-700 font-bold mb-2"
              >
                Marks
              </label>
              <input
                type="number"
                id="marks"
                name="marks"
                value={assignmentData.marks}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Thumbnail Image URL */}
            <div className="mb-4">
              <label
                htmlFor="thumbnailImageUrl"
                className="block text-gray-700 font-bold mb-2"
              >
                Thumbnail Image URL
              </label>
              <input
                type="text"
                id="thumbnailImageUrl"
                name="thumbnailImageUrl"
                value={assignmentData.thumbnailImageUrl}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Difficulty Level */}
            <div className="mb-4">
              <label
                htmlFor="difficultyLevel"
                className="block text-gray-700 font-bold mb-2"
              >
                Difficulty Level
              </label>
              <select
                id="difficultyLevel"
                name="difficultyLevel"
                value={assignmentData.difficultyLevel}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Due Date
              </label>
              <DatePicker
                id="dueDate"
                name="dueDate"
                selected={assignmentData.dueDate}
                onChange={handleDateChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-full">
                Save Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
