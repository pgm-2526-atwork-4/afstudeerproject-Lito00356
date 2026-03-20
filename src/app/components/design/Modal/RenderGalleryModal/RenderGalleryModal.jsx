import React, { useEffect, useState } from "react";
import { X, Trash2, Mail, ImagePlus } from "lucide-react";
import "./RenderGalleryModal.css";
import { getPublicImageUrl } from "@core/modules/storage/api.storage";
import { Bucket } from "@core/modules/storage/type";
import SendEmailModal from "@design/Modal/SendEmailModal/SendEmailModal";

const RenderGalleryModal = ({ isOpen, onClose, projectName, images = [] }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImages([]);
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedImages([]);
    onClose();
  };

  const toggleImage = (imagePath) => {
    setSelectedImages((prev) => (prev.includes(imagePath) ? prev.filter((p) => p !== imagePath) : [...prev, imagePath]));
  };

  const handleDeleteImages = () => {
    console.log("yeah boi");
  };

  const hasSelection = selectedImages.length > 0;

  return (
    <div
      className="modal__backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="render-gallery__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="render-gallery__panel">
          <div className="modal__header">
            <h2 className="modal__title">Renders — {projectName}</h2>
            <button className="modal__close" onClick={handleClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <div className="render-gallery__grid">
            {images.map((imagePath, index) => {
              const isSelected = selectedImages.includes(imagePath);
              return (
                <div
                  key={index}
                  className={`render-gallery__item ${isSelected ? "render-gallery__item--selected" : ""}`}
                  onClick={() => toggleImage(imagePath)}
                >
                  <div className={`render-gallery__checkbox ${isSelected ? "render-gallery__checkbox--checked" : ""}`}>
                    <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 5L4.5 8.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <img
                    src={getPublicImageUrl(Bucket.Renders, imagePath)}
                    alt={`Render ${index + 1}`}
                    className="render-gallery__img"
                    loading="lazy"
                  />
                </div>
              );
            })}
            {images.length === 1 && (
              <div className="render-gallery__placeholder">
                <ImagePlus size={24} strokeWidth={1.5} />
                <span className="render-gallery__placeholder-text">More renders will appear here</span>
              </div>
            )}
          </div>
        </div>

        <div className={`render-gallery__actions ${hasSelection ? "render-gallery__actions--visible" : ""}`}>
          <span className="render-gallery__actions-count">{selectedImages.length} selected</span>
          <div className="render-gallery__actions-buttons">
            <button
              className="render-gallery__action-btn render-gallery__action-btn--delete"
              onClick={() => handleDeleteImages()}
            >
              <Trash2 size={15} />
              Delete
            </button>
            <button
              className="render-gallery__action-btn render-gallery__action-btn--send"
              onClick={() => setIsEmailModalOpen(true)}
            >
              <Mail size={15} />
              Send email
            </button>
          </div>
        </div>
      </div>

      <SendEmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} selectedImages={selectedImages} />
    </div>
  );
};

export default RenderGalleryModal;
