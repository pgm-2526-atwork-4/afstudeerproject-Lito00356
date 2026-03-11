import { RefreshCcw, Trash } from "lucide-react";
import "./ObjectOptions.css";
import React from "react";

const ObjectOptions = ({ isVisible, onDelete, onResetRotation }) => {
  if (!isVisible) return null;

  return (
    <div className={`object-options ${isVisible ? "object-options--visible" : ""}`}>
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
