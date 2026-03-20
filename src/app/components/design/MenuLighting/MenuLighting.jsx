import "./MenuLighting.css";
import { Lightbulb, X, Sun, Image, EyeOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const SKY_PRESETS = [
  {
    id: "default",
    label: "Clear Day",
    elevation: 45,
    azimuth: 180,
    turbidity: 3,
    rayleigh: 0.4,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    sunColor: "#ffffff",
    ambientColor: "#e8f0ff",
  },
  {
    id: "sunset",
    label: "Sunset",
    elevation: 5,
    azimuth: 220,
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.1,
    mieDirectionalG: 0.95,
    sunColor: "#ff8c42",
    ambientColor: "#ffd4a8",
  },
  {
    id: "morning",
    label: "Morning",
    elevation: 20,
    azimuth: 90,
    turbidity: 4,
    rayleigh: 0.6,
    mieCoefficient: 0.01,
    mieDirectionalG: 0.8,
    sunColor: "#ffe0b2",
    ambientColor: "#cce0ff",
  },
  {
    id: "noon",
    label: "High Noon",
    elevation: 85,
    azimuth: 180,
    turbidity: 2,
    rayleigh: 0.2,
    mieCoefficient: 0.003,
    mieDirectionalG: 0.5,
    sunColor: "#ffffff",
    ambientColor: "#f0f4ff",
  },
];

const HDRI_OPTIONS = [
  { id: "suburban_garden", label: "Suburban Garden", file: "/environments/hdri/suburban_garden_1k.hdr" },
  { id: "dry_orchard", label: "Dry Orchard", file: "/environments/hdri/dry_orchard_meadow_1k.hdr" },
  { id: "farm_road", label: "Farm Road", file: "/environments/hdri/farm_road_1k.hdr" },
  { id: "citrus_orchard", label: "Citrus Orchard", file: "/environments/hdri/citrus_orchard_road_puresky_1k.hdr" },
  { id: "plains_sunset", label: "Plains Sunset", file: "/environments/hdri/plains_sunset_1k.hdr" },
  { id: "moonless_golf", label: "Moonless Golf", file: "/environments/hdri/moonless_golf_1k.hdr" },
  { id: "dikhololo_night", label: "Dikhololo Night", file: "/environments/hdri/dikhololo_night_1k.hdr" },
];

const MenuLighting = ({
  lightingMode,
  onModeChange,
  onSkyPresetChange,
  onHdriChange,
  activeSkyPreset,
  activeHdri,
  lightIntensity,
  onIntensityChange,
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

      <div
        className={`lighting-menu__options${panelOpen && lightingMode !== "none" ? " lighting-menu__options--visible" : ""}`}
      >
        {lightingMode === "sky" && (
          <>
            <span className="lighting-menu__section-title">Sky presets</span>
            {SKY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                className={`lighting-card${activeSkyPreset?.id === preset.id ? " lighting-card--active" : ""}`}
                onClick={() => onSkyPresetChange?.(preset)}
              >
                <Sun size={16} />
                <span className="lighting-card__title">{preset.label}</span>
              </button>
            ))}

            <div className="lighting-menu__controls">
              <span className="lighting-menu__section-title">Sun</span>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Height</label>
                <input
                  type="range"
                  min={0}
                  max={90}
                  value={activeSkyPreset?.elevation ?? 45}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, elevation: +e.target.value })}
                  className="lighting-menu__slider"
                />
                <span className="lighting-menu__control-value">{activeSkyPreset?.elevation ?? 45}°</span>
              </div>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Direction</label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={activeSkyPreset?.azimuth ?? 180}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, azimuth: +e.target.value })}
                  className="lighting-menu__slider"
                />
                <span className="lighting-menu__control-value">{activeSkyPreset?.azimuth ?? 180}°</span>
              </div>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Brightness</label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.1}
                  value={lightIntensity ?? 1}
                  onChange={(e) => onIntensityChange(+e.target.value)}
                  className="lighting-menu__slider"
                />
                <span className="lighting-menu__control-value">{(lightIntensity ?? 1).toFixed(1)}</span>
              </div>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Sun Color</label>
                <input
                  type="color"
                  value={activeSkyPreset?.sunColor ?? "#ffffff"}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, sunColor: e.target.value })}
                  className="lighting-menu__color-picker"
                />
                <span className="lighting-menu__control-value">{activeSkyPreset?.sunColor ?? "#fff"}</span>
              </div>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Ambient Color</label>
                <input
                  type="color"
                  value={activeSkyPreset?.ambientColor ?? "#e8f0ff"}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, ambientColor: e.target.value })}
                  className="lighting-menu__color-picker"
                />
                <span className="lighting-menu__control-value">{activeSkyPreset?.ambientColor ?? "#e8f"}</span>
              </div>

              <span className="lighting-menu__section-title">Atmosphere</span>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Haziness</label>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.5}
                  value={activeSkyPreset?.turbidity ?? 3}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, turbidity: +e.target.value })}
                  className="lighting-menu__slider"
                />
                <span className="lighting-menu__control-value">{activeSkyPreset?.turbidity ?? 3}</span>
              </div>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Sky Scatter</label>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={0.05}
                  value={activeSkyPreset?.rayleigh ?? 0.4}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, rayleigh: +e.target.value })}
                  className="lighting-menu__slider"
                />
                <span className="lighting-menu__control-value">{(activeSkyPreset?.rayleigh ?? 0.4).toFixed(2)}</span>
              </div>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Sun Haze</label>
                <input
                  type="range"
                  min={0}
                  max={0.5}
                  step={0.005}
                  value={activeSkyPreset?.mieCoefficient ?? 0.005}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, mieCoefficient: +e.target.value })}
                  className="lighting-menu__slider"
                />
                <span className="lighting-menu__control-value">{(activeSkyPreset?.mieCoefficient ?? 0.005).toFixed(3)}</span>
              </div>
              <div className="lighting-menu__control-group">
                <label className="lighting-menu__control-label">Sun Glow</label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={activeSkyPreset?.mieDirectionalG ?? 0.7}
                  onChange={(e) => onSkyPresetChange({ ...activeSkyPreset, mieDirectionalG: +e.target.value })}
                  className="lighting-menu__slider"
                />
                <span className="lighting-menu__control-value">{(activeSkyPreset?.mieDirectionalG ?? 0.7).toFixed(2)}</span>
              </div>
            </div>
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
