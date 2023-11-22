import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export default function AssignmentsPage() {
  const { user } = useContext(AuthContext); // Access the user object from AuthContext
  const submittedAssignments = useLoaderData();

  if (submittedAssignments.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Assignments</h1>
        <p>No assignments submitted yet.</p>
      </div>
    );
  }

  // Filter assignments based on the user's email
  const userAssignments = submittedAssignments.filter(
    (assignment) => assignment.email === user.email
  );

  if (userAssignments.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Assignments</h1>
        <p>No assignments submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Assignments</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300">
          {/* Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Title</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Status</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Marks</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Obtained Marks</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {userAssignments.map((assignment, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 sm:px-6 sm:py-3">
                  {assignment.title}
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">
                  {assignment.status}
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">
                  {assignment.marks}
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">
                  {assignment.obtainedMarks}
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">
                  {assignment.feedback}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
