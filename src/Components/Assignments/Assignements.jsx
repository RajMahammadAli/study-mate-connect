import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AssignmentsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust this based on your preference

  useEffect(() => {
    axios
      .get("https://online-group-study-server-side-one.vercel.app/assignments")
      .then((response) => {
        setAssignments(response.data);
        setFilteredAssignments(response.data);
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
          fetch(
            `https://online-group-study-server-side-one.vercel.app/assignments/${assignmentId}`,
            {
              method: "DELETE",
            }
          )
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

  const handleFilterAssignments = () => {
    filterAssignments(selectedDifficulty);
  };

  const handleDifficultyChange = (e) => {
    const difficulty = e.target.value;
    setSelectedDifficulty(difficulty);
  };

  const filterAssignments = (difficulty) => {
    if (difficulty === "all") {
      setFilteredAssignments(assignments);
    } else {
      const filtered = assignments.filter(
        (assignment) => assignment.difficultyLevel === difficulty
      );
      setFilteredAssignments(filtered);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssignments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <nav className=" mt-4">
        <ul className="pagination flex justify-center gap-2">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={`${
                  page === currentPage ? "btn btn-primary" : "btn btn-secondary"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Assignments</h2>

      <div className="flex mb-4">
        <label className="text-gray-700 mr-2">Filter by Difficulty:</label>
        <select
          className="select select-bordered mr-2"
          onChange={handleDifficultyChange}
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="btn btn-primary" onClick={handleFilterAssignments}>
          Filter Assignments
        </button>
      </div>

      {currentItems.length === 0 ? (
        <p className="text-center text-xl text-gray-500 mb-8">
          No assignments found. Go create some!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((assignment) => (
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

              <div className="lg:flex justify-between">
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
                <br />

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

      {renderPagination()}
    </div>
  );
}
