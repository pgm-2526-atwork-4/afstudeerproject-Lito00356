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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    const syncCanvasSize = () => {
      const rectangle = canvas.getBoundingClientRect();

      canvas.width = rectangle.width;
      canvas.height = rectangle.height;

      console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
    };

    syncCanvasSize();

    const drawGrid = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 20;

      for (let x = 0; x <= canvas.width; x += gridSize) {
        context.lineWidth = x % 100 === 0 ? 2 : 1;
        context.strokeStyle = x % 100 === 0 ? "#666" : "#e0e0e0";

        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        context.lineWidth = y % 100 === 0 ? 2 : 1;
        context.strokeStyle = y % 100 === 0 ? "#666" : "#e0e0e0";

        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }
    };

    drawGrid();

    const handleResize = () => {
      syncCanvasSize();
      drawGrid();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
