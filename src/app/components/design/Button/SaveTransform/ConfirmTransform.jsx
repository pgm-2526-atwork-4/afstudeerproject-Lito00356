import { Html } from "@react-three/drei";
import "./ConfirmTransform.css";
import React from "react";
import { Check, X } from "lucide-react";

const ConfirmTransform = ({ onSave, onReset, position = [0, 0, 0] }) => {
  return (
    <Html position={position} center>
      <div className="save-prompt">
        <button className="save-prompt__btn save-prompt__btn--save" onClick={onSave}>
          <Check />
        </button>
        <button className="save-prompt__btn save-prompt__btn--reset" onClick={onReset}>
          <X />
        </button>
      </div>
    </Html>
  );
};

export default ConfirmTransform;
