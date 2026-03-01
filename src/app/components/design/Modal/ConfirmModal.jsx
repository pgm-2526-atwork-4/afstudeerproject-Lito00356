import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import "./ConfirmModal.css";

const ConfirmModal = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  project,
  children,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  console.log(project);

  return (
    <div
      className="modal__backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__panel" ref={dialogRef} tabIndex={-1}>
        <div className="modal__header">
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
          <button className="modal__close" onClick={onCancel} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {description && <p className="modal__description">{description + project.scene_name}</p>}

        {children && <div className="modal__body">{children}</div>}

        <div className="modal__footer">
          <button className="modal__btn modal__btn--cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={`modal__btn modal__btn--confirm modal__btn--${variant}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
