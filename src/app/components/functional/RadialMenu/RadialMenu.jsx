import "./RadialMenu.css";
import { Html } from "@react-three/drei";
import { BrickWall, Palette, X } from "lucide-react";
import React, { useState } from "react";

const COLORS = [
  { name: "white", hex: "#FFFFFF" },
  { name: "red", hex: "#EF4444" },
  { name: "green", hex: "#10B981" },
  { name: "blue", hex: "#3B82F6" },
];
const MATERIALS = [
  { id: "wood", icon: "🪵", label: "Hout" },
  { id: "stone", icon: "🪨", label: "Steen" },
  { id: "metal", icon: "⚙️", label: "Metaal" },
];

// eslint-disable-next-line no-unused-vars
const RadialMenu = ({ furnitureId, onColorChange }) => {
  const [colorOpen, setColorOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);

  const changeFurnitureColor = (color) => {
    onColorChange(furnitureId, color);
  };
  const changeMaterial = (mat) => console.log("material:", mat);

  return (
    <>
      <Html position={[-1.5, 1, 0]} wrapperClass="radial-menu" distanceFactor={6}>
        <div className={`radial-menu__group ${materialOpen ? "radial-menu__group--open" : ""}`}>
          <button
            className="radial-menu__toggle radial-menu__toggle--material"
            onClick={() => setMaterialOpen((prev) => !prev)}
          >
            {materialOpen ? <X size={14} /> : <BrickWall size={14} />}
          </button>

          {MATERIALS.map((mat, i) => (
            <div
              key={mat.id}
              className="radial-menu__item radial-menu__item--material"
              style={{
                "--angle": `${(i - 49.5) * 45}deg`,
                "--delay": `${i * 55}ms`,
                backgroundColor: "#B7C3C1",
              }}
              onClick={() => changeMaterial(mat.id)}
              title={mat.label}
            >
              <span className="radial-menu__item-icon">{mat.icon}</span>
            </div>
          ))}
        </div>
      </Html>

      <Html position={[1, 1, 0]} wrapperClass="radial-menu" distanceFactor={6}>
        <div className={`radial-menu__group ${colorOpen ? "radial-menu__group--open" : ""}`}>
          <button className="radial-menu__toggle" onClick={() => setColorOpen((prev) => !prev)}>
            {colorOpen ? <X size={14} /> : <Palette size={14} />}
          </button>

          {COLORS.map((color, i) => (
            <div
              key={color.name}
              className="radial-menu__item radial-menu__item--color"
              style={{
                "--angle": `${(i - 49.5) * 45}deg`,
                "--delay": `${i * 55}ms`,
                backgroundColor: color.hex,
              }}
              onClick={() => changeFurnitureColor(color.name)}
            />
          ))}
        </div>
      </Html>
    </>
  );
};

export default RadialMenu;
