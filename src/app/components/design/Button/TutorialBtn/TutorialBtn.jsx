import { CircleQuestionMark } from "lucide-react";
import "./TutorialBtn.css";
import React from "react";

const TutorialBtn = ({ colorClass = "", onReset }) => {
  return (
    <button className={`tutorial-btn ${colorClass}`} aria-label="Tutorial" onClick={onReset} data-onboarding="tutorial-btn">
      <CircleQuestionMark size={30} />
    </button>
  );
};

export default TutorialBtn;
