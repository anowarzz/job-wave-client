import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto font-rubik">
      <Navbar />
      <Outlet> </Outlet>
      <Footer />
    </div>
  );
};

export default MainLayout;
