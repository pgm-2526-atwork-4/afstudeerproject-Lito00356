import { Camera, X } from "lucide-react";
import "./MenuRender.css";
import React, { useState } from "react";

const MenuRender = ({ onRender }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`render-menu ${isOpen ? "render-menu--open" : ""}`} data-onboarding="menu-render">
      <div className="render-menu__bar">
        <button className="render-menu__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle render menu">
          {isOpen ? <X size={18} /> : <Camera size={18} />}
        </button>
        <button className="render-menu__btn" onClick={onRender}>
          Take Snapshot
        </button>
      </div>
    </div>
  );
};

export default MenuRender;
