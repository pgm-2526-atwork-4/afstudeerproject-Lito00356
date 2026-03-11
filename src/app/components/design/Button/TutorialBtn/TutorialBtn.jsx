import { CircleQuestionMark } from "lucide-react";
import "./TutorialBtn.css";
import React from "react";

const TutorialBtn = ({ isDark = false, backgroundColor = "var(--main-bg)", onReset }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <button
      className={`tutorial-btn ${isDark ? "tutorial-btn--dark" : ""}`}
      style={buttonStyle}
      aria-label="Tutorial"
      onClick={onReset}
    >
      <CircleQuestionMark size={30} />
    </button>
  );
};

export default TutorialBtn;
