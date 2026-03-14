import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export const WINDOW_MODELS = {
  standard_single: {
    path: "/models/windows/standard_single/scene.gltf",
  },
};

export const getModelDimensions = (scene) => {
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);

  return { width: size.x, height: size.y, depth: size.z };
};
