import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import ErrorElement from "../pages/ErrorElement/ErrorElement";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home> </Home>,
      },
      {
        path: "/register",
        element: <Register> </Register>,
      },
      {
        path: "/signIn",
        element: <SignIn> </SignIn>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const response = await fetch(
              `http://localhost:5000/jobs/${params.id}`
            );
            if (!response.ok) {
              throw new Error(
                `Failed to fetch job: ${response.status} ${response.statusText}`
              );
            }
            return await response.json();
          } catch (error) {
            console.error("Error loading job details:", error);
            throw error; // This will trigger the ErrorElement
          }
        },
      },
    ],
  },
]);

export default router;
