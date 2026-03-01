import { getProjectById } from "@core/modules/projects/api.projects";
import { Canvas } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Blueprint = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
  });

  useEffect(() => {
    if (project?.objects) {
      navigate(`/perspective/${projectId}`);
    }
  }, [project, projectId, navigate]);

  return (
    <>
      <div>
        <h1>{project?.scene_name}</h1>
      </div>
    </>
  );
};

export default Blueprint;
