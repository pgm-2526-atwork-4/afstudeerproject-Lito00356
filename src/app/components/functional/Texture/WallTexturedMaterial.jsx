import { WALL_MATERIALS } from "@core/config/materialCatalogue";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const WallTexturedMaterial = ({ wallMaterialId }) => {
  const config = WALL_MATERIALS.find((material) => material.id === wallMaterialId) ?? WALL_MATERIALS[0];

  const textures = useTexture({
    diffuseMap: config.baseColor,
    normalMap: config.normal,
    roughnessMap: config.roughness,
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(...config.repeat);
  });

  return <meshStandardMaterial {...textures} side={THREE.DoubleSide} transparent opacity={1} />;
};

export default WallTexturedMaterial;
