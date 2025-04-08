import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route Not Found</h2>,
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
        path: "/login",
        element: <Login> </Login>,
      },
    ],
  },
]);

export default router;
