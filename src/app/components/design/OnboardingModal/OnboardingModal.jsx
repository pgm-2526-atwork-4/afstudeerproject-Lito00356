import "./OnboardingModal.css";
import React from "react";

const OnboardingModal = ({
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  onClose,
  onSkip,
  skipChecked,
  onSkipChange,
}) => {
  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <h2 className="onboarding-title">{title}</h2>
          <button className="onboarding-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="onboarding-description">{description}</p>

        {totalSteps > 1 && (
          <div className="onboarding-steps">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span key={i} className={`onboarding-dot ${i === currentStep ? "active" : ""}`} />
            ))}
          </div>
        )}

        <div className="onboarding-footer">
          <label className="onboarding-skip">
            <input type="checkbox" checked={skipChecked} onChange={(e) => onSkipChange(e.target.checked)} />
            Niet meer tonen
          </label>

          <button className="onboarding-btn" onClick={onNext}>
            {currentStep + 1 >= totalSteps ? "Klaar 🎉" : "Volgende →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
