import "./CameraViewChanger.css";
import React from "react";

const CameraViewChanger = ({ isTopView, onEnable, onDisable }) => {
  return (
    <button className={`topview-btn ${isTopView ? "topview-btn--active" : ""}`} onClick={isTopView ? onDisable : onEnable}>
      <div className="topview-btn__cube">
        <div className="topview-btn__face topview-btn__face--front" />
        <div className="topview-btn__face topview-btn__face--back" />
        <div className="topview-btn__face topview-btn__face--left" />
        <div className="topview-btn__face topview-btn__face--right" />
        <div className="topview-btn__face topview-btn__face--top" />
        <div className="topview-btn__face topview-btn__face--bottom" />
      </div>
      {/* <span>{isTopView ? "3D View" : "Top View"}</span> */}
    </button>
  );
};

export default CameraViewChanger;
