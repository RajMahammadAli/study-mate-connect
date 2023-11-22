import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "./Components/Roots/Roots.jsx";
import Assignements from "./Components/Assignments/Assignements.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import SubmittedAssignments from "./Components/SubmittedAssignments/SubmittedAssignments.jsx";
import Home from "./Components/Home/Home.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import CreatedAssignments from "./Components/CreatedAssignments/CreatedAssignments.jsx";
import UpdateAssignments from "./Components/UpdateAssignments/UpdateAssignments.jsx";
import ViewAssignments from "./Components/ViewAssaignments/ViewAssignments.jsx";
import SubmitAssignment from "./Components/SubmitAssignment/SubmitAssignment.jsx";
import GiveMarkPage from "./Components/GiveMarkPage/GiveMarkPage.jsx";
import MyAssignmentsPage from "./Components/MyAssignmentsPage/MyAssignmentsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/assignments",
        element: <Assignements></Assignements>,
      },
      {
        path: "/submitted-assignments",
        element: (
          <PrivateRoute>
            <SubmittedAssignments></SubmittedAssignments>
          </PrivateRoute>
        ),
        loader: () => fetch(`http://localhost:5000/submitAssignments`),
      },
      {
        path: "/giveMarkPage/:id",
        element: (
          <PrivateRoute>
            <GiveMarkPage></GiveMarkPage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/submitAssignments/${params.id}`),
      },
      {
        path: "/update-assignments/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignments></UpdateAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-assignment-page",
        element: (
          <PrivateRoute>
            <MyAssignmentsPage></MyAssignmentsPage>
          </PrivateRoute>
        ),
        loader: () => fetch(`http://localhost:5000/submitAssignments`),
      },
      {
        path: "/create-assignments",
        element: (
          <PrivateRoute>
            <CreatedAssignments></CreatedAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/submit-assignments/:id",
        element: (
          <PrivateRoute>
            <SubmitAssignment></SubmitAssignment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/assignments/${params.id}`),
      },
      {
        path: "/view-assignments/:id",
        element: (
          <PrivateRoute>
            <ViewAssignments></ViewAssignments>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/assignments/${params.id}`),
      },

      { path: "/logIn", element: <Login></Login> },

      { path: "/register", element: <Register></Register> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
