import { useLoaderData, useNavigate } from "react-router-dom";

export default function ViewAssignmentPage() {
  const assignment = useLoaderData();
  const navigate = useNavigate();

  const handleTakeAssignment = () => {
    // Add your logic to handle taking the assignment
    console.log("Taking assignment:", assignment.title);
    // You can add additional logic or redirect the user to the assignment taking page
    navigate(`/submit-assignments/${assignment._id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">View Assignment</h2>

      <div className="bg-white p-4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto rounded-md shadow-md">
        <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
        <p className="text-gray-700 mb-2">
          Description: {assignment.description}
        </p>
        <p className="text-gray-700 mb-2">Marks: {assignment.marks}</p>
        <p className="text-gray-700 mb-2">
          Difficulty: {assignment.difficultyLevel}
        </p>
        <p className="text-gray-700 mb-2">Due Date: {assignment.dueDate}</p>

        <img
          src={assignment.thumbnailImageUrl}
          alt={assignment.title}
          className="w-full h-40 object-cover mb-4 rounded-md"
        />

        <button onClick={handleTakeAssignment} className="btn btn-primary">
          Take Assignment
        </button>

        {/* Additional details or buttons can be added as needed */}
      </div>
    </div>
  );
}
