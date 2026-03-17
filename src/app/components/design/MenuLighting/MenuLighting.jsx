import "./MenuLighting.css";
import { Lightbulb, X, Sun, Image, EyeOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const SKY_PRESETS = [
  { id: "default", label: "Clear Day", elevation: 45, azimuth: 180 },
  { id: "sunset", label: "Sunset", elevation: 5, azimuth: 220 },
  { id: "morning", label: "Morning", elevation: 20, azimuth: 90 },
  { id: "noon", label: "High Noon", elevation: 85, azimuth: 180 },
];

const HDRI_OPTIONS = [
  { id: "suburban_garden", label: "Suburban Garden", file: "/environments/hdri/suburban_garden_1k.hdr" },
];

const MenuLighting = ({ lightingMode, onModeChange, onSkyPresetChange, onHdriChange, activeSkyPreset, activeHdri }) => {
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
    <div ref={menuRef} className={`lighting-menu${panelOpen ? " lighting-menu--open" : ""}`}>
      <div className="lighting-menu__bar">
        <button
          className="lighting-menu__toggle"
          onClick={() => setPanelOpen((v) => !v)}
          aria-label={panelOpen ? "Close lighting menu" : "Open lighting menu"}
          title={panelOpen ? "Close lighting menu" : "Open lighting menu"}
        >
          {panelOpen ? <X size={20} /> : <Lightbulb size={20} />}
        </button>

        <div className="lighting-menu__panel" aria-hidden={!panelOpen}>
          <span className="lighting-menu__label">Lighting</span>

          <div className="lighting-menu__mode-toggle">
            <button
              className={`lighting-menu__mode-btn${lightingMode === "none" ? " lighting-menu__mode-btn--active" : ""}`}
              onClick={() => onModeChange?.("none")}
              title="No environment"
            >
              <EyeOff size={14} />
              <span>None</span>
            </button>
            <button
              className={`lighting-menu__mode-btn${lightingMode === "sky" ? " lighting-menu__mode-btn--active" : ""}`}
              onClick={() => onModeChange?.("sky")}
              title="Procedural Sky"
            >
              <Sun size={14} />
              <span>Sky</span>
            </button>
            <button
              className={`lighting-menu__mode-btn${lightingMode === "hdri" ? " lighting-menu__mode-btn--active" : ""}`}
              onClick={() => onModeChange?.("hdri")}
              title="HDRI Environment"
            >
              <Image size={14} />
              <span>HDRI</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`lighting-menu__options${panelOpen && lightingMode !== "none" ? " lighting-menu__options--visible" : ""}`}>
        {lightingMode === "sky" && (
          <>
            <span className="lighting-menu__section-title">Sky presets</span>
            {SKY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                className={`lighting-card${activeSkyPreset === preset.id ? " lighting-card--active" : ""}`}
                onClick={() => onSkyPresetChange?.(preset)}
              >
                <Sun size={16} />
                <span className="lighting-card__title">{preset.label}</span>
              </button>
            ))}
          </>
        )}

        {lightingMode === "hdri" && (
          <>
            <span className="lighting-menu__section-title">Environments</span>
            {HDRI_OPTIONS.map((hdri) => (
              <button
                key={hdri.id}
                className={`lighting-card${activeHdri === hdri.id ? " lighting-card--active" : ""}`}
                onClick={() => onHdriChange?.(hdri)}
              >
                <Image size={16} />
                <span className="lighting-card__title">{hdri.label}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuLighting;
