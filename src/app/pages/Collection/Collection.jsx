import useAuth from "@functional/auth/useAuth";
import "./Collection.css";
import "@style/theme.css";
import React, { useState } from "react";
import { Upload, Eye, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import ImageWithFallback from "@functional/Image/ImageWithFallback";
import MenuProfile from "@design/MenuProfile/MenuProfile";
import ConfirmModal from "@design/Modal/ConfirmModal/ConfirmModal";
import RenderGalleryModal from "@design/Modal/RenderGalleryModal/RenderGalleryModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewProject, deleteProject, getUserProjects } from "@core/modules/projects/api.projects";
import { useNavigate } from "react-router";
import Pagination from "@functional/Pagination/Pagination";
import { ONBOARDING_STEPS } from "@core/config/onboardingSteps";
import OnboardingModal from "@design/OnboardingModal/OnboardingModal";
import { useOnboarding } from "@core/hooks/useOnboarding";
import PageStatus from "@design/PageStatus/PageStatus";
import { getPublicImageUrl } from "@core/modules/storage/api.storage";
import { Bucket } from "@core/modules/storage/type";

const Collection = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [galleryProjectId, setGalleryProjectId] = useState(null);

  // Pagination state:
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(4);

  // Onboarding
  const onboardingSteps = ONBOARDING_STEPS.welcome;
  const [skipChecked, setSkipChecked] = useState(false);
  const { isVisible, currentStep, nextStep, prevStep, skip } = useOnboarding("welcome");

  const {
    data: projects,
    error,
    isPending,
  } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => getUserProjects(user?.id),
  });

  const galleryProject = projects?.find((p) => p.id === galleryProjectId) ?? null;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const createProject = useMutation({
    mutationFn: createNewProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate(`/blueprint/${data.id}`);
    },
  });

  const deleteSelectedProject = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    const body = {
      user_id: user.id,
      scene_name: newProjectName,
    };

    createProject.mutate(body);
    setNewProjectName("");
    setIsCreateModalOpen(false);
  };

  const handleLoadProject = (projectId) => {
    navigate(`/perspective/${projectId}`);
  };

  const pageCount = Math.ceil(projects?.length / pageSize);

  const handlePageChanged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteProject = (id) => {
    deleteSelectedProject.mutate(id);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const projectsToDisplay = projects?.slice(startIndex, endIndex);

  if (isPending) return <PageStatus.Loading />;
  if (error || !projects) return <PageStatus.Error message="Projects could not be loaded." />;

  return (
    <main className="collection">
      <div className="top-actions">
        <MenuProfile colorClass="dark" />
      </div>
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
        targetSelector={onboardingSteps[currentStep]?.targetSelector}
      />

      <div className="collection__container">
        <header className="collection__header">
          <h1 className="collection__title">Welcome back, {user.email}</h1>
          <p className="collection__subtitle">Your design projects</p>
        </header>

        {projects.length > 0 ? (
          <div className="collection__table">
            <div className="collection__grid collection__labels">
              <span className="collection__col collection__col--preview">Preview</span>
              <span className="collection__col collection__col--name">Project name</span>
              <span className="collection__col collection__col--roomdata">Creation date</span>
              <span className="collection__col collection__col--actions">Actions</span>
            </div>
            {projectsToDisplay.map((project) => {
              const images = project.images ?? [];
              const hasImages = images.length > 0;
              const thumbnailUrl = hasImages ? getPublicImageUrl(Bucket.Renders, images[0]) : null;

              return (
                <div key={project.id} className="collection__grid">
                  <div className="collection__col collection__col--preview">
                    <div className="collection-project__thumb">
                      <ImageWithFallback
                        src={thumbnailUrl ?? project.thumbnail}
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
                    <button
                      className="collection-project__btn collection-project__btn--load"
                      onClick={() => setSelectedProject(project)}
                      data-onboarding="load-project"
                    >
                      <Upload size={16} />
                      Load
                    </button>
                    <button
                      className={`collection-project__btn collection-project__btn--view${!hasImages ? " collection-project__btn--disabled" : ""}`}
                      onClick={() => hasImages && setGalleryProjectId(project.id)}
                      disabled={!hasImages}
                      data-onboarding="view-renders"
                    >
                      <Eye size={16} />
                      {hasImages ? "View Renders" : "No images"}
                    </button>
                    <button
                      className="collection-project__btn collection-project__btn--delete"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setSelectedProject(project);
                      }}
                      data-onboarding="delete-project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="collection__empty">
            <h2 className="collection__empty-title">No projects yet</h2>
            <p className="collection__empty-text">Create a new project to get started</p>
          </div>
        )}

        <div className="collection__footer">
          {pageCount > 4 ? (
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageChanged={handlePageChanged} />
          ) : (
            <div></div>
          )}
          <button
            className="collection-project__btn collection-project__btn--load"
            onClick={() => setIsCreateModalOpen(true)}
            data-onboarding="create-room"
          >
            <Plus size={16} />
            Create new project
          </button>
        </div>
      </div>

      {/* Modal for loading */}
      <ConfirmModal
        isOpen={!!selectedProject}
        title="Do you want to continue?"
        description={`This will open project: `}
        project={selectedProject}
        confirmLabel="Open"
        cancelLabel="Cancel"
        onConfirm={() => {
          handleLoadProject(selectedProject?.id);
          setSelectedProject(null);
        }}
        onCancel={() => setSelectedProject(null)}
      />

      {/* Modal for deleting */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Do you want to continue?"
        description={`This will delete project: `}
        project={selectedProject}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          handleDeleteProject(selectedProject?.id);
          setIsDeleteModalOpen(false);
          setSelectedProject(null);
        }}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setSelectedProject(null);
        }}
      />

      {/* Modal for viewing renders */}
      <RenderGalleryModal
        isOpen={!!galleryProject}
        onClose={() => setGalleryProjectId(null)}
        projectName={galleryProject?.scene_name}
        projectId={galleryProject?.id}
        images={galleryProject?.images ?? []}
      />

      {/* Modal for creating new project */}
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
