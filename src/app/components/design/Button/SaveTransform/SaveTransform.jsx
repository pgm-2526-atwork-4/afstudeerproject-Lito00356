import { Html } from "@react-three/drei";
import "./SaveTransform.css";
import React from "react";
import { Check } from "lucide-react";

const SaveTransform = ({ onSave, position = [0, 0, 0] }) => {
  return (
    <Html position={position} center>
      <div className="save-prompt">
        <button className="save-prompt__btn" onClick={onSave}>
          <Check />
        </button>
      </div>
    </Html>
  );
};

export default SaveTransform;
