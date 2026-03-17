import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";

const CameraController = ({ isTopView }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (isTopView) {
      camera.position.set(0, 30, 0);
      camera.rotation.set(Math.PI / 2, 0, 0);
      // eslint-disable-next-line
      camera.fov = 10;
      camera.updateProjectionMatrix();
    } else {
      camera.position.set(10, 6, 10);
      camera.fov = 50;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(0, 0, 0);
  }, [isTopView, camera]);

  return null;
};

export default CameraController;
