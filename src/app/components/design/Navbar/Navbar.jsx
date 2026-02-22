import React from "react";
import { Link } from "react-router";
import "../../../../style/theme.css";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="container-70 navbar">
      <span className="">
        <img className="" src="https://placehold.co/25x25" alt="" />
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
