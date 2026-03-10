import { Save, X } from "lucide-react";
import "./MenuSave.css";
import React, { useState } from "react";

const MenuSave = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`save-menu ${isOpen ? "save-menu--open" : ""}`}>
      <div className="save-menu__bar">
        <button className="save-menu__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle save menu">
          {isOpen ? <X size={18} /> : <Save size={18} />}
        </button>
        <button className="save-menu__btn" onClick={onSave}>
          Save Scene
        </button>
      </div>
    </div>
  );
};

export default MenuSave;
