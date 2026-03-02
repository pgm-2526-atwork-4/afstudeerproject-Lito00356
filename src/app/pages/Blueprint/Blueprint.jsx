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

    const drawVertivalGrid = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = "#e0e0e0";
      context.lineWidth = 1;

      for (let x = 0; x <= canvas.width; x += 20) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }
    };

    const drawHorizontalGrid = () => {
      context.strokeStyle = "#e0e0e0";
      context.lineWidth = 1;

      for (let y = 0; y <= canvas.height; y += 20) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }
    };

    drawVertivalGrid();
    drawHorizontalGrid();

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
