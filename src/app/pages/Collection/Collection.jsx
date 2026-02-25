import useAuth from "@functional/auth/useAuth";
import "./Collection.css";
import "@style/theme.css";
import React, { useState } from "react";
import { Upload, Eye, Box } from "lucide-react";
import ImageWithFallback from "@functional/Image/ImageWithFallback";

const mockProjects = [
  {
    id: "1",
    name: "Living Room Redesign",
    thumbnail: null,
    roomData: {
      dimensions: "5m x 7m",
      furniture: "12 items",
      lastModified: "2 days ago",
    },
    renders: ["render1.jpg", "render2.jpg"],
  },
  {
    id: "2",
    name: "Home Office",
    thumbnail: null,
    roomData: {
      dimensions: "3m x 4m",
      furniture: "8 items",
      lastModified: "5 days ago",
    },
    renders: ["render3.jpg"],
  },
];

const Collection = () => {
  const { auth } = useAuth();
  const user = auth.user;
  // eslint-disable-next-line no-unused-vars
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="collection">
      <div className="collection__container">
        <header className="collection__header">
          <h1 className="collection__title">Welcome back, {user.email}</h1>
          <p className="collection__subtitle">Your design projects</p>
        </header>

        {mockProjects.length > 0 ? (
          <div className="collection__table">
            <div className="collection__table-header">
              <span className="collection__col collection__col--preview">Preview</span>
              <span className="collection__col collection__col--name">Project Name</span>
              <span className="collection__col collection__col--roomdata">Room Data</span>
              <span className="collection__col collection__col--actions">Actions</span>
            </div>

            {mockProjects.map((project) => (
              <div key={project.id} className="collection__row">
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
                  <p className="collection-project__data-row">
                    <span className="collection-project__data-label">Dimensions:</span> {project.roomData.dimensions}
                  </p>
                  <p className="collection-project__data-row">
                    <span className="collection-project__data-label">Items:</span> {project.roomData.furniture}
                  </p>
                  <p className="collection-project__data-modified">Modified {project.roomData.lastModified}</p>
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
        )}
      </div>
    </main>
  );
};

export default Collection;
