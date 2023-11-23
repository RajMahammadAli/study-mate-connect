import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateAssignmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [assignment, setAssignment] = useState({});

  const handleDateChange = (date) => {
    setAssignment({ ...assignment, dueDate: date });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/assignments/${id}`, { withCredentials: true })
      .then((response) => {
        const assignmentData = response.data;
        setAssignment({
          title: assignmentData.title,
          description: assignmentData.description,
          marks: assignmentData.marks,
          thumbnailImageUrl: assignmentData.thumbnailImageUrl,
          difficultyLevel: assignmentData.difficultyLevel,
          dueDate: assignmentData.dueDate
            ? new Date(assignmentData.dueDate)
            : new Date(),
        });
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/assignments/${id}`, assignment)
      .then((response) => {
        console.log("Assignment updated:", response.data);

        setTimeout(() => {
          toast("Assignments updated successfully");
          navigate(location?.state ? location.state : "/assignments");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating assignment:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Update Assignment</h2>

        <form onSubmit={handleUpdate} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={assignment.title}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={assignment.description}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3"
              required
            />
          </div>
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
              value={assignment.marks}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

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
              value={assignment.thumbnailImageUrl}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

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
              value={assignment.difficultyLevel}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

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
              selected={assignment.dueDate}
              onChange={handleDateChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
