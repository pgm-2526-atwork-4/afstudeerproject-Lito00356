import "./OnboardingModal.css";
import React from "react";

const OnboardingModal = ({
  isVisible,
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onClose,
  skipChecked,
  onSkipChange,
}) => {
  if (!isVisible) return null;

  const isLastStep = currentStep + 1 >= totalSteps;
  const isFirstStep = currentStep === 0;

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
            Don't show tips again
          </label>

          <div className="onboarding-actions">
            {!isFirstStep && (
              <button className="onboarding-btn onboarding-btn--prev" onClick={onPrev}>
                Back
              </button>
            )}
            <button className="onboarding-btn onboarding-btn--next" onClick={onNext}>
              {isLastStep ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
