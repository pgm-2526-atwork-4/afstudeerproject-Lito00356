import React from "react";
import { BoxGeometry } from "three";

const Room3D = ({ height = 2.5 }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <BoxGeometry args={[4, height, 4]} />
      <meshStandardMaterial color="lightBlue" />
    </mesh>
  );
};

export default Room3D;
