import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import ThemeProvider from "./context/ThemeContext/ThemeProvider.jsx";
import "./index.css";
import router from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
