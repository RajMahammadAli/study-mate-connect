import { useLoaderData } from "react-router-dom";

export default function GiveMarkPage() {
  const submitSingleAssignment = useLoaderData();
  console.log(submitSingleAssignment.pdfLink);

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
              Description
            </label>
            <p>{submitSingleAssignment.quickNote}</p>
          </div>

          {/* Marks Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Marks
            </label>
            <input
              type="number"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Marks"
              // Add onChange handler to update state
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
              // Add onChange handler to update state
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-primary"
              // Add onClick handler to submit data
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
