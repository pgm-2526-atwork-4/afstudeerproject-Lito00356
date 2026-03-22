import "./OnboardingModal.css";
import React, { useEffect, useState, useCallback } from "react";

const SPOTLIGHT_PADDING = 8;
const SPOTLIGHT_RADIUS = 12;

const OnboardingModal = ({
  isVisible,
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onClose,
  onSkipDone,
  skipChecked,
  onSkipChange,
  targetSelector,
}) => {
  const [spotlightRect, setSpotlightRect] = useState(null);

  const measureTarget = useCallback(() => {
    if (!targetSelector) {
      setSpotlightRect(null);
      return;
    }
    const el = document.querySelector(targetSelector);
    if (!el) {
      setSpotlightRect(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    setSpotlightRect({
      top: rect.top - SPOTLIGHT_PADDING,
      left: rect.left - SPOTLIGHT_PADDING,
      width: rect.width + SPOTLIGHT_PADDING * 2,
      height: rect.height + SPOTLIGHT_PADDING * 2,
    });
  }, [targetSelector]);

  useEffect(() => {
    if (!isVisible) return;
    measureTarget();

    window.addEventListener("resize", measureTarget);
    window.addEventListener("scroll", measureTarget, true);
    return () => {
      window.removeEventListener("resize", measureTarget);
      window.removeEventListener("scroll", measureTarget, true);
    };
  }, [isVisible, measureTarget]);

  if (!isVisible) return null;

  const isLastStep = currentStep + 1 >= totalSteps;
  const isFirstStep = currentStep === 0;

  const hasSpotlight = !!spotlightRect;

  const modalStyle = {};
  if (hasSpotlight) {
    const { top, left, width, height } = spotlightRect;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const modalWidth = 420;
    const gap = 16;

    if (centerX > window.innerWidth / 2) {
      modalStyle.right = window.innerWidth - left + gap;
    } else {
      modalStyle.left = left + width + gap;
    }

    if (centerY > window.innerHeight / 2) {
      modalStyle.bottom = window.innerHeight - (top + height);
    } else {
      modalStyle.top = top;
    }

    modalStyle.maxWidth = `min(${modalWidth}px, 90vw)`;
  }

  return (
    <div className={`onboarding-overlay${hasSpotlight ? " onboarding-overlay--spotlight" : ""}`} onClick={onClose}>
      {hasSpotlight && (
        <div
          className="onboarding-spotlight"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
            borderRadius: SPOTLIGHT_RADIUS,
          }}
        />
      )}

      <div
        className={`onboarding-modal ${hasSpotlight ? "onboarding-modal--positioned" : ""}`}
        style={hasSpotlight ? modalStyle : undefined}
        onClick={(e) => e.stopPropagation()}
      >
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
            {!isFirstStep && !skipChecked && (
              <button className="onboarding-btn onboarding-btn--prev" onClick={onPrev}>
                Back
              </button>
            )}
            {skipChecked ? (
              <button className="onboarding-btn onboarding-btn--next" onClick={onSkipDone}>
                Done
              </button>
            ) : (
              <button className="onboarding-btn onboarding-btn--next" onClick={onNext}>
                {isLastStep ? "Done" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
