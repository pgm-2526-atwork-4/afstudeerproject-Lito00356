import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export const OPENING_MODELS = {
  standard_single: {
    path: "/models/windows/standard_single/scene.gltf",
    label: "Standard Window",
    grounded: false,
    rotationOffset: [0, 0, 0],
  },
  window_big: {
    path: "/models/windows/window_big/scene.gltf",
    label: "Big Window",
    grounded: false,
    rotationOffset: [0, 0, 0],
  },
  vertical_window: {
    path: "/models/windows/vertical_window/scene.gltf",
    label: "Vertical Window",
    grounded: false,
    rotationOffset: [0, 0, 0],
  },
  window_squared: {
    path: "/models/windows/window_squared/scene.gltf",
    label: "Squared Window",
    grounded: false,
    rotationOffset: [0, 0, 0],
  },
  standard_brown_single: {
    path: "/models/doors/standard_brown_single/scene.gltf",
    label: "Standard Door",
    grounded: true,
    rotationOffset: [0, Math.PI / 2, 0],
  },
  interior_door: {
    path: "/models/doors/interior_door/scene.gltf",
    label: "Interior Door",
    grounded: true,
    rotationOffset: [0, Math.PI / 2, 0],
  },
};

const loader = new GLTFLoader();
const dimensionCache = {};

export const getModelDimensions = async (modelPath) => {
  if (dimensionCache[modelPath]) return dimensionCache[modelPath];

  const gltf = await loader.loadAsync(modelPath);
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const size = new THREE.Vector3();
  box.getSize(size);

  const dimensions = { width: size.x, height: size.y, depth: size.z };
  dimensionCache[modelPath] = dimensions;
  return dimensions;
};
