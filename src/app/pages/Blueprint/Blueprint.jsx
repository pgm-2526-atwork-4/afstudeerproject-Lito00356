import "./Blueprint.css";
import { getProjectById } from "@core/modules/projects/api.projects";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";

const Blueprint = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
  });

  return (
    <div className="blueprint-fullscreen">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid #ddd",
            background: "white",
            cursor: "crosshair",
          }}
        />
      </div>
    </div>
  );
};

export default Blueprint;
