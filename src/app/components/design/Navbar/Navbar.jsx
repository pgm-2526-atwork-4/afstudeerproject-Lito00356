import React from "react";
import { Link } from "react-router";
import "./Navbar.css";
import { Box } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="">
        <Box />
        <h2 className="">RoomCraft</h2>
      </span>
      <ul className="">
        <li className="">
          <Link className="" to="/login">
            Login
          </Link>
        </li>
        <li className="">
          <Link className="" to="/register">
            Get started
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
