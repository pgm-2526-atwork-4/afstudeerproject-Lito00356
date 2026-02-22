import { Outlet } from "react-router";
import Navbar from "@design/Navbar/Navbar";

function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default NavLayout;
