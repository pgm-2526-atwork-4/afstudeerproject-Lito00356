import { MousePointer2Off, RefreshCcw, Trash } from "lucide-react";
import "./ObjectOptions.css";
import React from "react";

const ObjectOptions = ({ isVisible, onDelete, onResetRotation, onDeselect }) => {
  return (
    <div className={`object-options${isVisible ? " object-options--visible" : ""}`} data-onboarding="object-options">
      <div className="object-options__item">
        <small>Deselect</small>
        <button className="object-options__btn" onClick={onDeselect}>
          <MousePointer2Off />
        </button>
      </div>
      <div className="object-options__item">
        <small>Delete object</small>
        <button className="object-options__btn object-options__btn--delete" onClick={onDelete}>
          <Trash />
        </button>
      </div>
      <div className="object-options__item">
        <small>Reset rotation</small>
        <button className="object-options__btn object-options__btn--reset" onClick={onResetRotation}>
          <RefreshCcw />
        </button>
      </div>
    </div>
  );
};

export default ObjectOptions;
