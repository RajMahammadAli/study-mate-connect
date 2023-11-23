import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function GiveMarkPage() {
  const navigate = useNavigate();
  const id = useParams();
  const [assignment, setAssignment] = useState({
    status: "completed",
    obtainedMarks: 0, // Renamed marks to obtainedMarks
    feedback: "",
  });
  const submitSingleAssignment = useLoaderData();
  console.log(submitSingleAssignment.status);

  console.log(assignment);

  const handleGiveMark = (id) => {
    console.log("Hello world");

    axios
      .put(
        `https://online-group-study-server-side-one.vercel.app/submitAssignments/${id}`,
        assignment,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Assignment updated:", response.data);

        setTimeout(() => {
          toast("Assignments marks given successfully");
          navigate(location?.state ? location.state : "/");
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
        <h1 className="text-3xl font-bold mb-4">Give Mark Now</h1>

        <div className="max-w-md mx-auto">
          {/* Google Drive Link */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Google Drive Link (PDF File)
            </label>
            <a href="http://" target="_blank">
              {submitSingleAssignment.pdfLink}
            </a>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Note Submitted by Examinee
            </label>
            <p>{submitSingleAssignment.quickNote}</p>
          </div>

          {/* Obtained Marks Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Obtained Marks
            </label>
            <input
              type="number"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Obtained Marks"
              value={assignment.obtainedMarks}
              // Add onChange handler to update state
              onChange={handleChange}
              name="obtainedMarks"
            />
          </div>

          {/* Feedback Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Feedback
            </label>
            <textarea
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Feedback"
              rows="4"
              value={assignment.feedback}
              // Add onChange handler to update state
              onChange={handleChange}
              name="feedback"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-primary"
              // Add onClick handler to submit data
              onClick={() => handleGiveMark(submitSingleAssignment._id)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
