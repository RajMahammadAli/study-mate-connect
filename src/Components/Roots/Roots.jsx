import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function () {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Content Wrapper */}
        <div className="flex-grow">
          <Navbar></Navbar>
          <Outlet></Outlet>
        </div>

        {/* Footer */}
        <Footer></Footer>
      </div>
    </>
  );
}
