import "./RadialMenu.css";
import { Html } from "@react-three/drei";
import { BrickWall, Palette, X } from "lucide-react";
import React, { useState } from "react";

const RadialMenu = ({ furnitureId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = ["red", "green", "blue", "orange", "purple", "pink"];

  const changeFurnitureColor = (furnitureId, color) => {
    console.log(color);
  };

  return (
    <Html position={[0, 1, 0]} wrapperClass="container" distanceFactor={5}>
      <div className={`radial-menu ${isExpanded ? "expanded" : ""}`}>
        <div className="main-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <X size={16} /> : <Palette size={16} />}
        </div>

        {colors.map((color, i) => (
          <div
            key={color}
            className="menu-item"
            style={{
              "--angle": `${i * 60}deg`,
              "--color": color,
              "--delay": `${i * 60}ms`,
            }}
            onClick={() => changeFurnitureColor(furnitureId, color)}
          />
        ))}

        <div className="material">
          <BrickWall size={16} />
        </div>
      </div>
    </Html>
  );
};

export default RadialMenu;
