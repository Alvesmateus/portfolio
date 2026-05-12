import { render, screen, within } from "@testing-library/react";
import ProjectsPage from "@/app/projetos/page";
import { portfolioData } from "@/data/portfolio";

describe("ProjectsPage", () => {
  it("renders the preserved project archive", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /todos os projetos/i }),
    ).toBeInTheDocument();

    const main = screen.getByRole("main");

    for (const project of portfolioData.projects) {
      expect(
        within(main).getAllByRole("heading", { level: 2, name: project.title })
          .length,
      ).toBeGreaterThan(0);
      expect(
        within(main).getAllByText(project.description).length,
      ).toBeGreaterThan(0);
    }
  });
});
