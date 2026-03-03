import ImageWithFallback from "@functional/Image/ImageWithFallback";
import "./MenuFurniture.css";
import { Armchair, X } from "lucide-react";
import React, { useState } from "react";

// ------------------------------------------------------------------
// Furniture categories – extend or replace with API data
// ------------------------------------------------------------------
const CATEGORIES = ["Zetels", "Tafels", "Bedden", "Stoelen", "Kasten", "Lampen"];

// (temporarily keep catalogue stub so nothing below breaks)
const CATALOGUE = {
  Zetels: [
    {
      id: "s1",
      title: "Comfort Sofa",
      image: null,
      fabrics: ["Leer", "Velvet", "Katoen", "Linnen"],
      colors: ["#8B4513", "#2F4F4F", "#F5F5DC", "#1C1C1C", "#708090", "#D2691E"],
    },
    {
      id: "s2",
      title: "Lounge Chair",
      image: null,
      fabrics: ["Velvet", "Bouclé", "Katoen"],
      colors: ["#4A4A4A", "#B5A99A", "#C8B8A2", "#7A6652"],
    },
    {
      id: "s3",
      title: "Chaise Longue",
      image: null,
      fabrics: ["Leer", "Microvezel", "Linnen"],
      colors: ["#FFFFFF", "#E8E0D5", "#5C4B3A", "#2E2E2E"],
    },
    {
      id: "s4",
      title: "Hoekzetel",
      image: null,
      fabrics: ["Velvet", "Katoen", "Bouclé"],
      colors: ["#6B8E6B", "#3D5A3D", "#A8C5A0", "#E8E0D5"],
    },
  ],
  Tafels: [
    {
      id: "t1",
      title: "Salontafel Rond",
      image: null,
      fabrics: ["Marmer", "Hout", "Glas"],
      colors: ["#F0EDE8", "#3B2A1A", "#C0C0C0", "#1A1A1A"],
    },
    {
      id: "t2",
      title: "Eettafel",
      image: null,
      fabrics: ["Eiken", "Walnoot", "Betonlook"],
      colors: ["#C8A97A", "#5C3A1E", "#9E9E9E", "#FAFAFA"],
    },
  ],
  Bedden: [
    {
      id: "b1",
      title: "Platform Bed",
      image: null,
      fabrics: ["Leer", "Velvet", "Linnen"],
      colors: ["#2E2E2E", "#8B7355", "#C8C0B8", "#4A3728"],
    },
    {
      id: "b2",
      title: "Boxspring",
      image: null,
      fabrics: ["Katoen", "Velvet", "Microvezel"],
      colors: ["#FFFFFF", "#E8E0D5", "#B0A898", "#6B6B6B"],
    },
  ],
  Stoelen: [
    {
      id: "ch1",
      title: "Eetstoel",
      image: null,
      fabrics: ["Leer", "Velvet", "Katoen"],
      colors: ["#1C1C1C", "#8B7355", "#C8B8A2", "#4A90A4"],
    },
  ],
};

const FurnitureItem = ({ item, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedFabric, setSelectedFabric] = useState(item.fabrics[0]);
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);

  return (
    <article className={`furniture-item${open ? " furniture-item--open" : ""}`}>
      <button className="furniture-item__header" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <div className="furniture-item__thumb">
          <ImageWithFallback src={item.image} alt={item.title} />
        </div>
        <span className="furniture-item__title">{item.title}</span>
        <ChevronRight className={`furniture-item__chevron${open ? " furniture-item__chevron--open" : ""}`} size={14} />
      </button>

      {open && (
        <div className="furniture-item__body">
          <div className="furniture-item__options">
            <p className="furniture-item__label">Stof</p>
            <div className="furniture-item__swatches furniture-item__swatches--text">
              {item.fabrics.map((f) => (
                <button
                  key={f}
                  className={`swatch-text${selectedFabric === f ? " swatch-text--active" : ""}`}
                  onClick={() => setSelectedFabric(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="furniture-item__options">
            <p className="furniture-item__label">Kleur</p>
            <div className="furniture-item__swatches">
              {item.colors.map((c) => (
                <button
                  key={c}
                  className={`swatch-color${selectedColor === c ? " swatch-color--active" : ""}`}
                  style={{ backgroundColor: c }}
                  title={c}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>
          </div>

          <button
            className="furniture-item__select-btn"
            onClick={() => onSelect({ ...item, fabric: selectedFabric, color: selectedColor })}
          >
            Selecteren
          </button>
        </div>
      )}
    </article>
  );
};

const FurnitureCategory = ({ label, items, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="furniture-category">
      <button
        className={`furniture-category__header${open ? " furniture-category__header--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          className={`furniture-category__chevron${open ? " furniture-category__chevron--open" : ""}`}
          size={16}
        />
      </button>

      <div className={`furniture-category__body${open ? " furniture-category__body--open" : ""}`}>
        <div className="furniture-category__scroll">
          {items.map((item) => (
            <FurnitureItem key={item.id} item={item} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuFurniture = ({ onFurnitureSelect }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const items = selectedCategory ? (CATALOGUE[selectedCategory] ?? []) : [];

  return (
    <div className={`furniture-menu${panelOpen ? " furniture-menu--open" : ""}`}>
      {/* ── Horizontal bar: toggle (left/always visible) + panel (right) ── */}
      <div className="furniture-menu__bar">
        <button
          className="furniture-menu__toggle"
          onClick={() => {
            setPanelOpen((v) => !v);
            if (panelOpen) setSelectedCategory("");
          }}
          aria-label={panelOpen ? "Sluit meubelmenu" : "Open meubelmenu"}
          title={panelOpen ? "Sluit meubelmenu" : "Open meubelmenu"}
        >
          {panelOpen ? <X size={20} /> : <Armchair size={20} />}
        </button>

        <div className="furniture-menu__panel" aria-hidden={!panelOpen}>
          <label htmlFor="furniture-category-select" className="furniture-menu__label">
            Meubels
          </label>
          <select
            id="furniture-category-select"
            className="furniture-menu__select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Kies een categorie…
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Cards grid – opens below when a category is selected ── */}
      {panelOpen && items.length > 0 && (
        <div className="furniture-menu__items">
          {items.map((item) => (
            <button key={item.id} className="furniture-card" onClick={() => onFurnitureSelect && onFurnitureSelect(item)}>
              <div className="furniture-card__thumb">
                <ImageWithFallback src={item.image} alt={item.title} />
              </div>
              <span className="furniture-card__title">{item.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuFurniture;
