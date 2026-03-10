import { Save, X } from "lucide-react";
import "./MenuSave.css";
import React, { useState } from "react";

const MenuSave = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    console.log("Save Scene");
    // TODO: Implement save functionality
  };

  return (
    <div className={`save-menu ${isOpen ? "save-menu--open" : ""}`}>
      <div className="save-menu__bar">
        <button className="save-menu__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle save menu">
          {isOpen ? <X size={18} /> : <Save size={18} />}
        </button>
        <button className="save-menu__btn" onClick={handleSave}>
          Save Scene
        </button>
      </div>
    </div>
  );
};

export default MenuSave;
