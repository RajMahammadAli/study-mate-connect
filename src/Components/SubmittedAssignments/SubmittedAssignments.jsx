// import { useLoaderData, useNavigate } from "react-router-dom";
// import DisplayAssignments from "./displayAssignments";

// export default function SubmittedAssignmentsPage() {
//   const navigate = useNavigate();
//   const submittedAssignments = useLoaderData();
//   const pendingAssignments = submittedAssignments.find(
//     (items) => items.status === "completed"
//   );
//   console.log(pendingAssignments);

//   const handleGiveMarkPage = (id) => {
//     console.log("ready to give mark", id);
//     navigate(`/giveMarkPage/${id}`);
//   };

//   return (
//     <>
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold underline my-8">
//           Submitted Assignments
//         </h1>

//         <div className="overflow-x-auto">
//           <table className="w-full bg-white border border-gray-300">
//             {/* head */}
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="px-4 py-2 sm:px-6 sm:py-3">SL. No.</th>
//                 <th className="px-4 py-2 sm:px-6 sm:py-3">Title</th>
//                 <th className="px-4 py-2 sm:px-6 sm:py-3">Marks</th>
//                 <th className="px-4 py-2 sm:px-6 sm:py-3">Examinee Name</th>
//                 <th className="px-4 py-2 sm:px-6 sm:py-3">Evaluate</th>
//                 <th className="px-4 py-2 sm:px-6 sm:py-3"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {submittedAssignments.map((items, idx) => (
//                 <DisplayAssignments
//                   key={items._id}
//                   items={items}
//                   idx={idx}
//                   handleGiveMarkPage={handleGiveMarkPage}
//                 ></DisplayAssignments>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

import { useLoaderData, useNavigate } from "react-router-dom";
import DisplayAssignments from "./displayAssignments";

export default function SubmittedAssignmentsPage() {
  const navigate = useNavigate();
  const submittedAssignments = useLoaderData();
  const pendingAssignments = submittedAssignments.filter(
    (items) => items.status === "pending"
  );
  console.log(pendingAssignments);

  const handleGiveMarkPage = (id) => {
    console.log("ready to give mark", id);
    navigate(`/giveMarkPage/${id}`);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold underline my-8">
          Submitted Assignments
        </h1>

        <div className="overflow-x-auto">
          {pendingAssignments.length > 0 ? (
            <table className="w-full bg-white border border-gray-300">
              {/* head */}
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 sm:px-6 sm:py-3">SL. No.</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3">Title</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3">Marks</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3">Examinee Name</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3">Evaluate</th>
                  <th className="px-4 py-2 sm:px-6 sm:py-3"></th>
                </tr>
              </thead>
              <tbody>
                {pendingAssignments.map((items, idx) => (
                  <DisplayAssignments
                    key={items._id}
                    items={items}
                    idx={idx}
                    handleGiveMarkPage={handleGiveMarkPage}
                  ></DisplayAssignments>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-xl text-gray-500 mb-8">
              No pending assignments found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
