import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";
import { portfolioData } from "@/data/portfolio";

describe("HomePage", () => {
  it("renders shared navigation and preserved portfolio footer identity", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /mateus alves/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /início/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /projetos/i })).toHaveAttribute(
      "href",
      "/projetos",
    );
    expect(screen.getByRole("link", { name: /thumbnails/i })).toHaveAttribute(
      "href",
      "/thumbnails",
    );
    expect(screen.getByRole("link", { name: /contato/i })).toHaveAttribute(
      "href",
      "/contato",
    );

    const footer = screen.getByRole("contentinfo");

    expect(
      within(footer).getByText(portfolioData.profile.ageLabel),
    ).toBeInTheDocument();
    expect(
      within(footer).getByText(portfolioData.profile.phrase),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("link", { name: portfolioData.contact.phoneLabel }),
    ).toHaveAttribute("href", portfolioData.contact.whatsappHref);
    expect(
      within(footer).getByRole("link", { name: portfolioData.contact.email }),
    ).toHaveAttribute("href", portfolioData.contact.emailHref);
  });
});
