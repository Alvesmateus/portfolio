import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

export function ProjectGrid() {
  return (
    <section aria-label="Arquivo de projetos" className="project-grid">
      {portfolioData.projects.map((project, index) => (
        <ProjectCard key={project.assetPath} index={index} project={project} />
      ))}
    </section>
  );
}
