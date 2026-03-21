import { WALL_MATERIALS } from "@core/config/materialCatalogue";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const WallTexturedMaterial = ({ wallMaterialId, wallLength, wallHeight }) => {
  const config = WALL_MATERIALS.find((material) => material.id === wallMaterialId) ?? WALL_MATERIALS[0];
  const tileSize = config.repeat;

  const textures = useTexture({
    map: config.baseColor,
    normalMap: config.normal,
    roughnessMap: config.roughness,
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(wallLength / tileSize[0], wallHeight / tileSize[1]);
  });

  return <meshStandardMaterial {...textures} side={THREE.DoubleSide} transparent opacity={1} />;
};

export default WallTexturedMaterial;
