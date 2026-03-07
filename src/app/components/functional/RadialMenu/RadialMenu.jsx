import "./RadialMenu.css";
import { Html } from "@react-three/drei";
import { BrickWall, Palette, X } from "lucide-react";
import React, { useState } from "react";

const COLORS = ["red", "green", "blue", "orange", "purple", "pink"];
const MATERIALS = [
  { id: "wood", icon: "🪵", label: "Hout" },
  { id: "stone", icon: "🪨", label: "Steen" },
  { id: "metal", icon: "⚙️", label: "Metaal" },
];

const RadialMenu = ({ furnitureId }) => {
  const [colorOpen, setColorOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);

  const changeFurnitureColor = (color) => console.log("color:", color);
  const changeMaterial = (mat) => console.log("material:", mat);

  const toggleColor = () => {
    setColorOpen((prev) => !prev);
    setMaterialOpen(false);
  };

  const toggleMaterial = () => {
    setMaterialOpen((prev) => !prev);
    setColorOpen(false);
  };

  return (
    <Html position={[0, 1, 0]} wrapperClass="radial-menu" distanceFactor={5}>
      <div className="radial-menu__groups">
        <div className={`radial-menu__group ${colorOpen ? "radial-menu__group--open" : ""}`}>
          <button className="radial-menu__toggle" onClick={toggleColor}>
            {colorOpen ? <X size={14} /> : <Palette size={14} />}
          </button>

          {COLORS.map((color, i) => (
            <div
              key={color}
              className="radial-menu__item radial-menu__item--color"
              style={{
                "--angle": `${i * 60}deg`,
                "--color": color,
                "--delay": `${i * 55}ms`,
              }}
              onClick={() => changeFurnitureColor(color)}
            />
          ))}
        </div>

        <div className={`radial-menu__group ${materialOpen ? "radial-menu__group--open" : ""}`}>
          <button className="radial-menu__toggle radial-menu__toggle--material" onClick={toggleMaterial}>
            {materialOpen ? <X size={14} /> : <BrickWall size={14} />}
          </button>

          {MATERIALS.map((mat, i) => (
            <div
              key={mat.id}
              className="radial-menu__item radial-menu__item--material"
              style={{
                "--angle": `${i * 60}deg`,
                "--delay": `${i * 55}ms`,
              }}
              onClick={() => changeMaterial(mat.id)}
              title={mat.label}
            >
              <span className="radial-menu__item-icon">{mat.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </Html>
  );
};

export default RadialMenu;
