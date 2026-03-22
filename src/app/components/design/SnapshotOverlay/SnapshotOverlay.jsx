import "./SnapshotOverlay.css";
import React from "react";

const SnapshotOverlay = ({ countdown }) => {
  if (countdown === null) return null;

  return (
    <div className="snapshot-overlay">
      <div className="snapshot-viewfinder">
        <div className="snapshot-corner snapshot-corner--tl" />
        <div className="snapshot-corner snapshot-corner--tr" />
        <div className="snapshot-corner snapshot-corner--bl" />
        <div className="snapshot-corner snapshot-corner--br" />
        <div className="snapshot-crosshair" />

        <div className="snapshot-rec">
          <span className="snapshot-rec__dot" />
          <span>REC</span>
        </div>

        {countdown > 0 && (
          <span key={countdown} className="snapshot-countdown">
            {countdown}
          </span>
        )}
      </div>

      {countdown === 0 && <div className="snapshot-flash" />}
    </div>
  );
};

export default SnapshotOverlay;
