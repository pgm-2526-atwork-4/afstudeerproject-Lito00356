import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export const WINDOW_MODELS = {
  standard_single: {
    path: "/models/windows/standard_single/scene.gltf",
    label: "Standard Window",
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
