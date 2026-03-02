import "./Blueprint.css";
import { getProjectById } from "@core/modules/projects/api.projects";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Blueprint = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [walls, setWalls] = useState([]);
  const [selectedWall, setSelectedWall] = useState(null);

  const gridSize = 20;

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
    };

    syncCanvasSize();

    const drawGrid = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

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

      context.fillStyle = "#007bff";
      context.strokeStyle = "#ffffff";
      context.lineWidth = 2;

      points.forEach((p) => {
        context.beginPath();
        context.arc(p.x, p.y, 6, 0, Math.PI * 2);
        context.fill();
        context.stroke();
      });

      context.strokeStyle = "#007bff";
      canvas.lineWidth = 4;
      context.lineCap = "round";
      context.lineJoin = "round";

      walls.forEach((wall) => {
        const startPoint = points.find((p) => p.id === wall.start);
        const endPoint = points.find((p) => p.id === wall.end);
        const isHovered = selectedWall == wall.id;

        if (startPoint && endPoint) {
          context.beginPath();
          context.moveTo(startPoint.x, startPoint.y);
          context.lineTo(endPoint.x, endPoint.y);
          context.lineWidth = isHovered ? 6 : 4;
          context.strokeStyle = isHovered ? "#ff4444" : "#007bff";
          context.stroke();
        }
      });
    };

    syncCanvasSize();
    drawGrid();

    const handleResize = () => {
      syncCanvasSize();
      drawGrid();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [points, walls]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const gridSize = 20;
    const snappedPointX = Math.round(x / gridSize) * gridSize;
    const snappedPointY = Math.round(y / gridSize) * gridSize;

    const newPoint = {
      x: snappedPointX,
      y: snappedPointY,
      id: crypto.randomUUID(),
    };

    const firstPoint = points[0];
    if (
      firstPoint &&
      points.length >= 2 &&
      Math.abs(newPoint.x - firstPoint.x) < 5 &&
      Math.abs(newPoint.y - firstPoint.y) < 5
    ) {
      const lastPoint = points[points.length - 1];
      setWalls((prevWalls) => [
        ...prevWalls,
        {
          id: crypto.randomUUID(),
          start: lastPoint.id,
          end: firstPoint.id,
          startPosition: lastPoint,
          endPosition: firstPoint,
        },
      ]);

      return;
    }

    setPoints((prev) => {
      const newPoints = [...prev, newPoint];

      if (newPoints.length >= 2) {
        const lastPointBefore = newPoints[newPoints.length - 2];
        const newWall = {
          id: crypto.randomUUID(),
          start: lastPointBefore.id,
          end: newPoint.id,
          startPosition: lastPointBefore,
          endPosition: newPoint,
        };
        setWalls((prevWalls) => [...prevWalls, newWall]);
      }

      return newPoints;
    });
  };

  return (
    <div className="blueprint-fullscreen">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
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
