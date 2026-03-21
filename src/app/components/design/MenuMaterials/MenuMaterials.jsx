import "./MenuMaterials.css";
import { Check, Paintbrush, Undo2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FLOOR_MATERIALS, WALL_MATERIALS } from "@core/config/materialCatalogue";

const MenuMaterials = ({
  floorMaterialId,
  onFloorChange,
  wallMaterialId,
  onWallMaterialChange,
  wallColor,
  onWallColorChange,
  onConfirm,
  onCancel,
  materialsAdjusted,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!panelOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [panelOpen]);

  return (
    <div ref={menuRef} className={`materials-menu${panelOpen ? " materials-menu--open" : ""}`} data-onboarding="menu-materials">
      <div className="materials-menu__bar">
        <button
          className="materials-menu__toggle"
          onClick={() => setPanelOpen((v) => !v)}
          aria-label={panelOpen ? "Close materials menu" : "Open materials menu"}
          title={panelOpen ? "Close materials menu" : "Open materials menu"}
        >
          {panelOpen ? <X size={20} /> : <Paintbrush size={20} />}
        </button>

        <div className="materials-menu__panel" aria-hidden={!panelOpen}>
          <span className="materials-menu__label">Materials</span>
          {panelOpen && materialsAdjusted && (
            <div className="materials-menu__actions">
              <small className="materials-menu__actions materials-menu__actions-confirm">Confirm</small>
              <button
                className="materials-menu__action-btn materials-menu__action-btn--confirm"
                onClick={onConfirm}
                title="Save materials"
              >
                <Check size={14} />
              </button>
              <button
                className="materials-menu__action-btn materials-menu__action-btn--cancel"
                onClick={onCancel}
                title="Revert changes"
              >
                <Undo2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`materials-menu__options${panelOpen ? " materials-menu__options--visible" : ""}`}>
        <span className="materials-menu__section-title">Floor</span>
        <button
          className={`materials-card${!floorMaterialId ? " materials-card--active" : ""}`}
          onClick={() => onFloorChange(null)}
        >
          <div className="materials-card__swatch" style={{ background: "#e0d5c1" }} />
          <span className="materials-card__title">Default</span>
        </button>
        {FLOOR_MATERIALS.map((mat) => (
          <button
            key={mat.id}
            className={`materials-card${floorMaterialId === mat.id ? " materials-card--active" : ""}`}
            onClick={() => onFloorChange(mat.id)}
          >
            <img className="materials-card__swatch" src={mat.baseColor} alt={mat.label} />
            <span className="materials-card__title">{mat.label}</span>
          </button>
        ))}

        <span className="materials-menu__section-title">Walls</span>
        <div className="materials-menu__wall-color">
          <button
            className={`materials-card${!wallMaterialId ? " materials-card--active" : ""}`}
            onClick={() => onWallMaterialChange(null)}
          >
            <div className="materials-card__swatch" style={{ background: wallColor }} />
            <span className="materials-card__title">Solid Color</span>
          </button>
          {!wallMaterialId && (
            <input
              type="color"
              value={wallColor}
              onChange={(e) => onWallColorChange(e.target.value)}
              className="materials-menu__color-picker"
            />
          )}
        </div>
        {WALL_MATERIALS.map((mat) => (
          <button
            key={mat.id}
            className={`materials-card${wallMaterialId === mat.id ? " materials-card--active" : ""}`}
            onClick={() => onWallMaterialChange(mat.id)}
          >
            <img className="materials-card__swatch" src={mat.baseColor} alt={mat.label} />
            <span className="materials-card__title">{mat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuMaterials;
