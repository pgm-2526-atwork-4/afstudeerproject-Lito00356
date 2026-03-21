import ImageWithFallback from "@functional/Image/ImageWithFallback";
import "./MenuFurniture.css";
import { Armchair, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { MODEL_CATEGORIES } from "@core/config/furnitureCatalogue";

const MenuFurniture = ({ handleAddFurniture, handleAddOpening }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const menuRef = useRef(null);

  const selectedCategory = MODEL_CATEGORIES.find((cat) => cat.id === selectedCategoryId);
  const items = selectedCategory?.items ?? [];

  const handleItemClick = (item) => {
    if (selectedCategory.type === "opening") {
      handleAddOpening?.(item.openingKey);
    } else {
      handleAddFurniture?.({ id: item.id, path: item.path });
    }
  };

  useEffect(() => {
    if (!panelOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setPanelOpen(false);
        setSelectedCategoryId("");
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [panelOpen]);

  return (
    <div ref={menuRef} className={`furniture-menu${panelOpen ? " furniture-menu--open" : ""}`} data-onboarding="menu-furniture">
      <div className="furniture-menu__bar">
        <button
          className="furniture-menu__toggle"
          onClick={() => {
            setPanelOpen((v) => !v);
            if (panelOpen) setSelectedCategoryId("");
          }}
          aria-label={panelOpen ? "Close furniture menu" : "Open furniture menu"}
          title={panelOpen ? "Close furniture menu" : "Open furniture menu"}
        >
          {panelOpen ? <X size={20} /> : <Armchair size={20} />}
        </button>

        <div className="furniture-menu__panel" aria-hidden={!panelOpen}>
          <label htmlFor="furniture-category-select" className="furniture-menu__label">
            Furniture
          </label>
          <select
            id="furniture-category-select"
            className="furniture-menu__select"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="" disabled>
              Choose a category..
            </option>
            {MODEL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`furniture-menu__items${panelOpen && items.length > 0 ? " furniture-menu__items--visible" : ""}`}>
        {items.map((item) => (
          <button key={item.id} className="furniture-card" onClick={() => handleItemClick(item)}>
            <div className="furniture-card__thumb">
              <ImageWithFallback />
            </div>
            <span className="furniture-card__title">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuFurniture;
