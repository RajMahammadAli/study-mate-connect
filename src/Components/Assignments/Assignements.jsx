import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

export default function AssignmentsPage() {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments from the backend API (replace '/api/assignments' with your actual API endpoint)
    axios.get("http://localhost:5000/assignments").then((response) => {
      setAssignments(response.data);
    });
  }, []);

  const handleDelete = (assignmentId) => {
    // Implement assignment deletion logic here
    console.log("Deleting assignment with ID:", assignmentId);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Assignments</h2>

      {assignments.length === 0 ? (
        <p className="text-center text-xl text-gray-500 mb-8">
          No assignments found. Go create some!
        </p>
      ) : (
        <div className="flex flex-wrap">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white p-4 rounded-md shadow-md m-2 transition-transform transform hover:scale-105"
            >
              {/* ... (previous code) */}
              <img
                src={assignment.thumbnailImageUrl}
                alt={assignment.title}
                className="w-full h-40 object-cover mb-2 rounded-md"
              />

              <h3 className="text-lg font-semibold mb-1">{assignment.title}</h3>
              <p className="text-gray-700 mb-1">Marks: {assignment.marks}</p>
              <p className="text-gray-700 mb-2">
                Difficulty: {assignment.difficultyLevel}
              </p>

              <div className="flex justify-between">
                <button className="btn btn-primary">View Assignment</button>

                <button className="btn btn-secondary">Update Assignment</button>

                {/* Delete Button (Only visible for admins) */}

                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
