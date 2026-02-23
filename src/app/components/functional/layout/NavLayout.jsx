import { Outlet } from "react-router";
import Navbar from "@design/Navbar/Navbar";
import "./NavLayout.css";
import Footer from "@design/Footer/Footer";

function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default NavLayout;
