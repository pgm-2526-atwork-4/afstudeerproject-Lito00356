/**
 * Furniture & opening catalogue — derived from public/models/ folder structure.
 *
 * To add a new model:
 *   1. Drop the model folder into the correct category under public/models/
 *   2. Add an entry below with { id, label, path } pointing to the .gltf file
 *
 * type "furniture" → placed freely in the scene
 * type "opening"   → snaps to a wall (door / window)
 */

export const MODEL_CATEGORIES = [
  {
    id: "armchairs",
    label: "Armchairs",
    type: "furniture",
    items: [{ id: "ligtar", label: "Ligtar", path: "/models/armchairs/ligtar/scene.gltf" }],
  },
  {
    id: "carpets",
    label: "Carpets",
    type: "furniture",
    items: [
      { id: "astremo", label: "Astremo", path: "/models/carpets/astremo/scene.gltf" },
      { id: "dinpol", label: "Dinpol", path: "/models/carpets/dinpol/scene.gltf" },
      { id: "koelang", label: "Koelang", path: "/models/carpets/koelang/scene.gltf" },
      { id: "reguto", label: "Reguto", path: "/models/carpets/reguto/scene.gltf" },
    ],
  },
  {
    id: "couches",
    label: "Couches",
    type: "furniture",
    items: [
      { id: "biprolap_leather", label: "Biprolap", path: "/models/couches/biprolap_leather/sofa.gltf" },
      { id: "gimbar_sofa", label: "Gimbar", path: "/models/couches/gimbar_sofa/scene.gltf" },
      { id: "milomar_textile", label: "Milomar", path: "/models/couches/milomar_textile/scene.gltf" },
      { id: "regtar_sofa", label: "Regtar", path: "/models/couches/regtar_sofa/scene.gltf" },
    ],
  },
  {
    id: "tv_stands",
    label: "TV Stands",
    type: "furniture",
    items: [
      { id: "melon", label: "Melon", path: "/models/tv_stands/melon/scene.gltf" },
      { id: "renglar", label: "Renglar", path: "/models/tv_stands/renglar/scene.gltf" },
    ],
  },
  {
    id: "sets",
    label: "Sets",
    type: "furniture",
    items: [{ id: "riglir", label: "Riglir", path: "/models/sets/dining/riglir/scene.gltf" }],
  },
  {
    id: "doors",
    label: "Doors",
    type: "opening",
    items: [
      { id: "standard_brown_single", label: "Standard Door", openingKey: "standard_brown_single" },
      { id: "interior_door", label: "Interior Door", openingKey: "interior_door" },
    ],
  },
  {
    id: "windows",
    label: "Windows",
    type: "opening",
    items: [
      { id: "standard_single", label: "Standard Window", openingKey: "standard_single" },
      { id: "mat_window", label: "Mat Window", openingKey: "mat_window" },
      { id: "vertical_window", label: "Vertical Window", openingKey: "vertical_window" },
      { id: "window_squared", label: "Squared Window", openingKey: "window_squared" },
    ],
  },
];
