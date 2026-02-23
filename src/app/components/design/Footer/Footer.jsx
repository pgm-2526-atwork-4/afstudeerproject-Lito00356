import { Box } from "lucide-react";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Box className="footer__icon" />
        <span className="footer__name">RoomCraft</span>
      </div>
      <span className="footer__copy">© 2026 RoomCraft. Tomasz Liksza. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
