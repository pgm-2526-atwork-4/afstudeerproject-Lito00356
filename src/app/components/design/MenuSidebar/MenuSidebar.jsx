import React from "react";
import "./MenuSidebar.css";

const OPENING_TYPES = [
  { type: "door", label: "Deur", icon: "🚪", defaults: { width: 0.9, height: 2.1 } },
  { type: "window", label: "Raam", icon: "🪟", defaults: { width: 1.2, height: 1.0 } },
];

const MenuSidebar = () => {
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("opening", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <aside className="opening-sidebar">
      <h3 className="opening-sidebar__title">Openingen</h3>
      <ul className="opening-sidebar__list">
        {OPENING_TYPES.map((item) => (
          <li key={item.type} className="opening-sidebar__item" draggable onDragStart={(e) => handleDragStart(e, item)}>
            <span className="opening-sidebar__icon">{item.icon}</span>
            <span className="opening-sidebar__label">{item.label}</span>
            <span className="opening-sidebar__meta">
              {item.defaults.width}m × {item.defaults.height}m
            </span>
          </li>
        ))}
      </ul>
      <p className="opening-sidebar__hint">Sleep naar een wand in de 3D view</p>
    </aside>
  );
};

export default MenuSidebar;
