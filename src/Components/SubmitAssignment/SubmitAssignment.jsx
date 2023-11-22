import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function SubmitAssignmentPage() {
  const assigments = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pdfLink, setPdfLink] = useState("");
  const [quickNote, setQuickNote] = useState("");

  const email = user.email;
  const examineeName = user.displayName;
  console.log(pdfLink);

  const {
    title,
    description,
    marks,
    thumbnailImageUrl,
    difficultyLevel,
    dueDate,
  } = assigments;

  const handleSubmit = () => {
    if (!pdfLink || !quickNote) {
      // Show an error toast if any of the fields are empty
      toast.error("Please fill in all the required fields.");
      return;
    }

    if (!isValidPdfLink(pdfLink)) {
      toast.error("Invalid PDF link. Please enter a valid PDF link.");
      return;
    }
    // Add your logic for submitting the assignment to MongoDB
    const formData = {
      pdfLink: pdfLink,
      quickNote: quickNote,
      title: title,
      description: description,
      marks: marks,
      examineeName: examineeName,
      email: email,
      thumbnailImageUrl: thumbnailImageUrl,
      difficultyLevel: difficultyLevel,
      dueDate: dueDate,
      status: "pending",
      // Add other fields as needed
    };

    // Example: Post data to MongoDB
    axios
      .post("http://localhost:5000/submitAssignments", formData)
      .then((response) => {
        console.log("Assignment submitted successfully:", response.data);
        // Add any additional logic, such as showing a success message or redirecting
        toast.success("Assignment submitted successfully!");
        navigate("/submitted-assignments");
      })
      .catch((error) => {
        console.error("Error submitting assignment:", error);
        // Handle error if needed
      });
  };

  const isValidPdfLink = (link) => {
    // You can implement a more sophisticated validation based on your requirements
    // This is a simple example that checks if the link ends with ".pdf"
    return link.toLowerCase().endsWith(".pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Submit Assignment</h2>

      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            PDF Link
          </label>
          <input
            type="text"
            value={pdfLink}
            onChange={(e) => setPdfLink(e.target.value)}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quick Note
          </label>
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
          ></textarea>
        </div>

        {/* Additional form fields can be added as needed */}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit Assignment
          </button>
        </div>
      </form>
    </div>
  );
}
