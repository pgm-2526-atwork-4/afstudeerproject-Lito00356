import React from "react";
import { Link } from "react-router";
import "./Navbar.css";
import { Box } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-container__logo">
          <Box className="navbar-container__icon" />
          <h2 className="navbar-container__title">RoomCraft</h2>
        </Link>
        <ul className="navbar__list">
          <li className="navbar__list-item ">
            <Link className="list__item-link light" to="/login">
              Login
            </Link>
          </li>
          <li className="navbar__list-item">
            <Link className="list__item-link list__item-link--bg dark" to="/register">
              Get started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
