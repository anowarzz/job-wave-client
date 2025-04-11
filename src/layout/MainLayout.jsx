import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet> </Outlet>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
