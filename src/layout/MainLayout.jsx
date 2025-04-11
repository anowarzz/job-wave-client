import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen font-rubik">
   
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet> </Outlet>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
