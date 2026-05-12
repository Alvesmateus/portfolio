import type { ProjectItem } from "@/types/portfolio";

type ProjectCardProps = {
  project: ProjectItem;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__media">
        <video
          className="project-card__video"
          controls
          playsInline
          preload="metadata"
          src={project.assetPath}
        />
        <span className="project-card__frame" aria-hidden="true" />
        <span className="project-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="project-card__body">
        <p className="project-card__kicker" aria-hidden="true">Video Editing</p>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
    </article>
  );
}
