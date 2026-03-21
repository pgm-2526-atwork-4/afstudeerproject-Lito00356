import React from "react";
import "./TitleBadge.css";
import { useNavigate, useParams, useLocation } from "react-router";

const TitleBadge = ({ title }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { pathname } = useLocation();

  const isCurrentPageActive = pathname.includes(title.toLowerCase());

  const handleNavigateToBlueprint = () => {
    navigate(`/blueprint/${projectId}`);
  };

  return (
    <div className="title-badge-container" data-onboarding="title-badge">
      <strong className={`title-badge ${isCurrentPageActive ? "title-badge--active" : ""}`}>{title}</strong>

      {!pathname.includes("blueprint") && (
        <button
          className={`title-badge__button ${pathname.includes("blueprint") ? "title-badge__button--active" : ""}`}
          onClick={handleNavigateToBlueprint}
        >
          Blueprint
        </button>
      )}
    </div>
  );
};

export default TitleBadge;
