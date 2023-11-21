import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AssignmentsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/assignments").then((response) => {
      setAssignments(response.data);
    });
  }, []);

  const handleDelete = (assignmentId, assignmentEmail) => {
    console.log("Deleting assignment with ID:", assignmentId);

    if (user && user.email === assignmentEmail) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/assignments/${assignmentId}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.deletedCount > 0) {
                setAssignments((prevAssigns) =>
                  prevAssigns.filter((item) => item._id !== assignmentId)
                );
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            })
            .catch((error) => {
              console.error("Error deleting assignments:", error);
            });
        }
      });
    } else {
      Swal.fire({
        title: "Access Denied",
        text: "You don't have permission to delete this assignment.",
        icon: "error",
      });
    }
  };

  const handleUpdate = (id, assignmentEmail) => {
    // Check if the logged-in user has the authority to update the assignment
    if (user && user.email === assignmentEmail) {
      navigate(`/update-assignments/${id}`);
    } else {
      // User doesn't have authority to update, show an alert
      Swal.fire({
        title: "Access Denied",
        text: "You don't have permission to update this assignment.",
        icon: "error",
      });
    }
  };
  const handleViewAssignments = (id) => {
    // Check if the logged-in user has the authority to update the assignment
    navigate(`/view-assignments/${id}`);
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
                <button
                  onClick={() => handleViewAssignments(assignment._id)}
                  className="btn btn-primary"
                >
                  View Assignment
                </button>

                <button
                  onClick={() => handleUpdate(assignment._id, assignment.email)}
                  className="btn btn-secondary"
                >
                  Update Assignment
                </button>

                <button
                  onClick={() => handleDelete(assignment._id, assignment.email)}
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
