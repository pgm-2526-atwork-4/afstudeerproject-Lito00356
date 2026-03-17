import React, { useEffect } from "react";
import { X, ImageOff } from "lucide-react";
import "./RenderGalleryModal.css";
import { getPublicImageUrl } from "@core/modules/storage/api.storage";
import { Bucket } from "@core/modules/storage/type";

const RenderGalleryModal = ({ isOpen, onClose, projectName, images = [] }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal__backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className="render-gallery__panel">
        <div className="modal__header">
          <h2 className="modal__title">Renders — {projectName}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="render-gallery__grid">
          {images.map((imagePath, index) => (
            <div key={index} className="render-gallery__item">
              <img
                src={getPublicImageUrl(Bucket.Renders, imagePath)}
                alt={`Render ${index + 1}`}
                className="render-gallery__img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderGalleryModal;
