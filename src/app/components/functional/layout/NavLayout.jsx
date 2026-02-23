import { Outlet } from "react-router";
import Navbar from "@design/Navbar/Navbar";
import "./NavLayout.css";

function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default NavLayout;
