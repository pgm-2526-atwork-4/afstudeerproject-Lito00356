import { Geometry, Subtraction, Base } from "@react-three/csg";
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FLOOR_MATERIALS } from "@core/config/materialCatalogue";
import { useTexture } from "@react-three/drei";
import WallTexturedMaterial from "@functional/Texture/WallTexturedMaterial";

const _wallNormal = new THREE.Vector3();
const _cameraDir = new THREE.Vector3();

const Wall = ({ start, end, height, thickness, openings = [], wallMaterialId, wallColor }) => {
  const { position, rotation, length, wallLength } = useMemo(() => {
    const dx = end[0] - start[0];
    const dz = end[2] - start[2];
    const realWallLength = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(dz, dx);

    // Extend each wall by half thickness on each side so corners meet
    const extendedLength = realWallLength + thickness;

    const midX = (start[0] + end[0]) / 2;
    const midZ = (start[2] + end[2]) / 2;

    return {
      position: [midX, height / 2, midZ],
      rotation: [0, -angle, 0],
      length: extendedLength,
      wallLength: realWallLength,
    };
  }, [start, end, height, thickness]);

  const normalizedOpenings = useMemo(
    () =>
      openings.map((opening) => {
        const halfOpeningWidth = (opening.width ?? 1) / 2;
        const maxOffset = Math.max(0, wallLength / 2 - halfOpeningWidth - 0.05);
        const clampedOffset = THREE.MathUtils.clamp(opening.offset ?? 0, -maxOffset, maxOffset);
        const openingHeight = opening.height ?? 1;
        const grounded = opening.type === "door";
        const centerY = grounded
          ? openingHeight / 2
          : THREE.MathUtils.clamp(
              opening.centerY ?? height / 2,
              openingHeight / 2 + 0.05,
              height - openingHeight / 2 - 0.05,
            );

        return {
          id: opening.id,
          width: opening.width ?? 1,
          height: openingHeight,
          depth: opening.depth ?? thickness + 0.12,
          localPosition: [clampedOffset, centerY - height / 2, 0],
        };
      }),
    [openings, height, wallLength, thickness],
  );

  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <Geometry>
        <Base>
          <boxGeometry args={[length, height, thickness]} />
        </Base>

        {normalizedOpenings.map((opening) => (
          <Subtraction key={opening.id} position={opening.localPosition}>
            <boxGeometry args={[opening.width, opening.height, opening.depth]} />
          </Subtraction>
        ))}
      </Geometry>
      {wallMaterialId ? (
        <WallTexturedMaterial wallMaterialId={wallMaterialId} wallHeight={height} wallLength={wallLength} />
      ) : (
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} transparent opacity={1} />
      )}
    </mesh>
  );
};

const FloorTexturedMaterial = ({ floorMaterialId }) => {
  const materialConfig = FLOOR_MATERIALS.find((m) => m.id === floorMaterialId) ?? FLOOR_MATERIALS[0];

  const textures = useTexture({
    map: materialConfig.baseColor,
    normalMap: materialConfig.normal,
    roughnessMap: materialConfig.roughness,
  });

  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(...materialConfig.repeat);
  });

  return <meshStandardMaterial {...textures} side={THREE.DoubleSide} />;
};

const Floor = ({ walls, floorMaterialId }) => {
  const geometry = useMemo(() => {
    if (!walls.length) return null;

    const shape = new THREE.Shape();
    shape.moveTo(walls[0].start[0], -walls[0].start[2]);
    walls.forEach((wall) => {
      shape.lineTo(wall.end[0], -wall.end[2]);
    });

    return new THREE.ShapeGeometry(shape);
  }, [walls]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      {floorMaterialId ? (
        <FloorTexturedMaterial floorMaterialId={floorMaterialId} />
      ) : (
        <meshStandardMaterial color="#e0d5c1" side={THREE.DoubleSide} />
      )}
    </mesh>
  );
};

const FADE_SPEED = 6;
const OCCLUDED_OPACITY = 0.15;

const Room3D = ({
  walls = [],
  wallThickness = 0.1,
  height = 2.5,
  openings = [],
  floorMaterialId,
  wallMaterialId,
  wallColor,
}) => {
  const wallGroupRef = useRef();

  const openingsByWall = useMemo(() => {
    const grouped = {};

    openings.forEach((opening) => {
      if (!opening.wallId) return;
      if (!grouped[opening.wallId]) {
        grouped[opening.wallId] = [];
      }
      grouped[opening.wallId].push(opening);
    });

    return grouped;
  }, [openings]);

  useFrame(({ camera }, delta) => {
    if (!wallGroupRef.current) return;

    wallGroupRef.current.children.forEach((wallMesh) => {
      if (!wallMesh.isMesh || !wallMesh.material) return;

      _wallNormal.set(0, 0, 1).applyQuaternion(wallMesh.quaternion);
      _cameraDir.copy(wallMesh.position).sub(camera.position).normalize();

      const dot = _wallNormal.dot(_cameraDir);
      const targetOpacity = dot < 0 ? OCCLUDED_OPACITY : 1;

      wallMesh.material.opacity = THREE.MathUtils.lerp(wallMesh.material.opacity, targetOpacity, FADE_SPEED * delta);
    });
  });

  return (
    <group>
      <group ref={wallGroupRef}>
        {walls.map((wall) => (
          <Wall
            key={wall.id}
            start={wall.start}
            end={wall.end}
            height={height}
            thickness={wallThickness}
            openings={openingsByWall[wall.id] ?? []}
            wallMaterialId={wallMaterialId}
            wallColor={wallColor}
          />
        ))}
      </group>
      <Floor walls={walls} floorMaterialId={floorMaterialId} />
    </group>
  );
};

export default Room3D;
