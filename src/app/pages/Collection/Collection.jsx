import useAuth from "@functional/auth/useAuth";
import "./Collection.css";
import "@style/theme.css";
import React, { useState } from "react";
import { Upload, Eye, Plus } from "lucide-react";
import { format } from "date-fns";
import ImageWithFallback from "@functional/Image/ImageWithFallback";
import MenuProfile from "@design/MenuProfile/MenuProfile";
import ConfirmModal from "@design/Modal/ConfirmModal";
import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "@core/modules/rooms/api.rooms";

const Collection = () => {
  const { auth } = useAuth();
  const user = auth.user;
  // eslint-disable-next-line no-unused-vars
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const {
    data: rooms,
    error,
    isPending,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
  });

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    // TODO: call your create project API here, e.g. createRoom(newProjectName)
    console.log("Creating project:", newProjectName);
    setNewProjectName("");
    setIsCreateModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  if (isPending) return <p>Loading...</p>;
  if (error || !rooms) return <p>Could not load profiles</p>;

  return (
    <main className="collection">
      <MenuProfile />

      <div className="collection__container">
        <header className="collection__header">
          <h1 className="collection__title">Welcome back, {user.email}</h1>
          <p className="collection__subtitle">Your design projects</p>
        </header>

        {rooms.length > 0 ? (
          <div className="collection__table">
            <div className="collection__grid collection__labels">
              <span className="collection__col collection__col--preview">Preview</span>
              <span className="collection__col collection__col--name">Project name</span>
              <span className="collection__col collection__col--roomdata">Creation date</span>
              <span className="collection__col collection__col--actions">Actions</span>
            </div>
            {rooms.map((project) => (
              <div key={project.id} className="collection__grid">
                <div className="collection__col collection__col--preview">
                  <div className="collection-project__thumb">
                    <ImageWithFallback
                      src={project.thumbnail}
                      alt={project.scene_name}
                      className="collection-project__thumb-img"
                    />
                  </div>
                </div>
                <div className="collection__col collection__col--name">
                  <h3 className="collection-project__name">{project.scene_name}</h3>
                </div>

                <div className="collection__col collection__col--roomdata">
                  <p className="collection-project__data-row">{formatDate(project.created_at)}</p>
                </div>

                <div className="collection__col collection__col--actions">
                  <button className="collection-project__btn collection-project__btn--load">
                    <Upload size={16} />
                    Load
                  </button>
                  <button
                    className="collection-project__btn collection-project__btn--view"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye size={16} />
                    View Renders
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>No items yet</h1>
          </div>
        )}

        {/* {rooms.length > 0 ? (
          <div className="collection__table">
            <div className="collection__grid collection__labels">
              <span className="collection__col collection__col--preview">Preview</span>
              <span className="collection__col collection__col--name">Project Name</span>
              <span className="collection__col collection__col--roomdata">Room Data</span>
              <span className="collection__col collection__col--actions">Actions</span>
            </div>

            {rooms.map((project) => (
              <div key={project.id} className="collection__grid">
                <div className="collection__col collection__col--preview">
                  <div className="collection-project__thumb">
                    <ImageWithFallback
                      src={project.thumbnail}
                      alt={project.name}
                      className="collection-project__thumb-img"
                    />
                  </div>
                </div>

                <div className="collection__col collection__col--name">
                  <h3 className="collection-project__name">{project.name}</h3>
                </div>

                <div className="collection__col collection__col--roomdata">
                  <p className="collection-project__data-row"></p>
                  <p className="collection-project__data-row"></p>
                  <p className="collection-project__data-modified"></p>
                </div>

                <div className="collection__col collection__col--actions">
                  <button className="collection-project__btn collection-project__btn--load">
                    <Upload size={16} />
                    Load
                  </button>
                  <button
                    className="collection-project__btn collection-project__btn--view"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye size={16} />
                    View Renders ({project.renders.length})
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="collection__empty">
            <Box className="collection__empty-icon" />
            <h3 className="collection__empty-title">No projects yet</h3>
            <p className="collection__empty-text">Start creating your first room design</p>
          </div>
        )} */}
        <button className="collection-project__btn collection-project__btn--load" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={16} />
          Create new project
        </button>
      </div>

      <ConfirmModal
        isOpen={isCreateModalOpen}
        title="Create new project"
        description="Give your project a name to get started."
        confirmLabel="Create"
        cancelLabel="Cancel"
        onConfirm={handleCreateProject}
        onCancel={() => {
          setNewProjectName("");
          setIsCreateModalOpen(false);
        }}
      >
        <label htmlFor="project-name">Project name</label>
        <input
          id="project-name"
          type="text"
          placeholder="e.g. Living room redesign"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreateProject()}
          autoFocus
        />
      </ConfirmModal>
    </main>
  );
};

export default Collection;
