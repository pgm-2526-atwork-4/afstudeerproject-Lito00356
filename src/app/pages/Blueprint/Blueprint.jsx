import "./Blueprint.css";
import "@style/theme.css";
import { getProjectById } from "@core/modules/projects/api.projects";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MenuProfile from "@design/MenuProfile/MenuProfile";
import TitleBadge from "@design/TitleBadge/TitleBadge";
import { useSaveRoom } from "@core/hooks/useSaveRoom";
import useAuth from "@functional/auth/useAuth";
import OnboardingModal from "@design/OnboardingModal/OnboardingModal";
import { ONBOARDING_STEPS } from "@core/config/onboardingSteps";
import { useOnboarding } from "@core/hooks/useOnboarding";
import { getDistance } from "@core/utils/geometry";

const Blueprint = () => {
  const { auth } = useAuth();
  const user = auth.user;
  const { projectId } = useParams();
  const id = Number(projectId);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const saveRoom = useSaveRoom();
  const [points, setPoints] = useState([]);
  const [walls, setWalls] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedWall, setSelectedWall] = useState(null);
  const [isRoomClosed, setIsRoomClosed] = useState(false);
  const [previewPoint, setPreviewPoint] = useState(null);

  // Calculate distnace
  const [liveDistance, setLiveDistance] = useState(null);

  const gridSize = 20;

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!project.room_data) return;

    const { points, walls } = project.room_data;
    if (points?.length) setPoints(points);
    if (walls?.length) setWalls(walls);
    if (walls?.length) setIsRoomClosed(true);
  }, [project]);

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

      if (previewPoint) {
        context.save();
        context.fillStyle = "rgba(0, 123, 255, 0.3)"; // zacht blauw
        context.strokeStyle = "#007bff";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(previewPoint.x, previewPoint.y, 6, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.restore();
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

      // Om de muren te tekenen
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

      walls.forEach((wall) => {
        if (!wall.distance) return;

        const startPoint = points.find((p) => p.id === wall.start);
        const endPoint = points.find((p) => p.id === wall.end);
        if (!startPoint || !endPoint) return;

        const midX = (startPoint.x + endPoint.x) / 2;
        const midY = (startPoint.y + endPoint.y) / 2;

        const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);

        context.save();
        context.translate(midX, midY);
        context.rotate(angle);

        const label = `${wall.distance}m`;
        context.font = "bold 12px sans-serif";
        const textWidth = context.measureText(label).width;
        context.fillStyle = "rgba(250,250,250,0.85)";
        context.fillRect(-textWidth / 2 - 4, -22, textWidth + 8, 18);

        context.fillStyle = "#007bff";
        context.textAlign = "center";
        context.fillText(label, 0, -9);

        context.restore();
      });

      if (liveDistance && points.length > 0) {
        const { from, to, label } = liveDistance;

        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);

        context.save();
        context.translate(midX, midY);
        context.rotate(angle);

        context.font = "bold 12px sans-serif";
        const textWidth = context.measureText(label).width;

        // Iets andere stijl dan permanent label — oranje/preview
        context.fillStyle = "rgba(255, 200, 0, 0.9)";
        context.fillRect(-textWidth / 2 - 4, -22, textWidth + 8, 18);

        context.fillStyle = "#333";
        context.textAlign = "center";
        context.fillText(label, 0, -9);

        context.restore();
      }
    };

    syncCanvasSize();
    drawGrid();

    const handleResize = () => {
      syncCanvasSize();
      drawGrid();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [points, walls, previewPoint, isRoomClosed, liveDistance, isPending]);

  const handleCanvasClick = (e) => {
    if (isRoomClosed) {
      return;
    }
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
          distance: getDistance(lastPoint, firstPoint).meter,
        },
      ]);

      setIsRoomClosed(true);
      return;
    }

    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      const { meter } = getDistance(lastPoint, { x: snappedPointX, y: snappedPointY });
      setLiveDistance({
        from: lastPoint,
        to: { x: snappedPointX, y: snappedPointY },
        label: `${meter}m`,
      });
    } else {
      setLiveDistance(null);
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
          distance: getDistance(lastPointBefore, newPoint).meter,
        };
        setWalls((prevWalls) => [...prevWalls, newWall]);
      }

      return newPoints;
    });
  };

  const handleMouseMove = (e) => {
    if (isRoomClosed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const snappedPointX = Math.round(x / gridSize) * gridSize;
    const snappedPointY = Math.round(y / gridSize) * gridSize;

    const existingPoint = points.some((p) => Math.abs(p.x - snappedPointX) < 10 && Math.abs(p.y - snappedPointY) < 10);

    setPreviewPoint(existingPoint ? null : { x: snappedPointX, y: snappedPointY });

    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      const { meter } = getDistance(lastPoint, { x: snappedPointX, y: snappedPointY });
      setLiveDistance({
        from: lastPoint,
        to: { x: snappedPointX, y: snappedPointY },
        label: `${meter}m`,
      });
    } else {
      setLiveDistance(null);
    }
  };

  const handleConvertTo3D = () => {
    const body = {
      id: Number(projectId),
      user_id: user.id,
      scene_name: project?.scene_name,
      room_data: {
        points,
        walls,
      },
    };

    saveRoom.mutate(body);

    navigate(`/perspective/${projectId}`);
  };

  // Onboarding
  const onboardingSteps = ONBOARDING_STEPS.blueprint;
  const [skipChecked, setSkipChecked] = useState(false);
  const { isVisible, currentStep, nextStep, prevStep, skip } = useOnboarding("blueprint");

  if (isPending) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project {projectId} niet gevonden</p>;

  return (
    <div className="blueprint-fullscreen">
      <TitleBadge title="blueprint" />
      <MenuProfile colorClass="dark" />
      <OnboardingModal
        isVisible={isVisible}
        title={onboardingSteps[currentStep]?.title}
        description={onboardingSteps[currentStep]?.description}
        currentStep={currentStep}
        totalSteps={onboardingSteps.length}
        onNext={() => nextStep(onboardingSteps.length)}
        onPrev={prevStep}
        onClose={() => skip(skipChecked)}
        skipChecked={skipChecked}
        onSkipChange={setSkipChecked}
      />
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setPreviewPoint(null);
            setLiveDistance(null);
          }}
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid #ddd",
            background: "white",
            cursor: "crosshair",
          }}
        />
      </div>
      <button
        className="reset-blueprint-btn"
        onClick={() => {
          setPoints([]);
          setWalls([]);
          setIsRoomClosed(false);
        }}
        title="Reset all walls and points"
      >
        Reset
      </button>
      <button
        className="convert-blueprint-btn"
        disabled={!isRoomClosed}
        onClick={() => handleConvertTo3D()}
        title="Convert blueprint to 3D model"
      >
        Convert to 3D
      </button>
    </div>
  );
};

export default Blueprint;
