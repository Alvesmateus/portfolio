import { render, screen, within } from "@testing-library/react";
import ContactPage from "@/app/contato/page";
import ThumbnailsPage from "@/app/thumbnails/page";
import { portfolioData } from "@/data/portfolio";

describe("ThumbnailsPage", () => {
  it("renders the preserved thumbnail archive", () => {
    render(<ThumbnailsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /todas as thumbnails/i }),
    ).toBeInTheDocument();

    const main = screen.getByRole("main");
    const images = within(main).getAllByRole("img");
    expect(images).toHaveLength(portfolioData.thumbnails.length);

    for (const thumbnail of portfolioData.thumbnails) {
      expect(
        within(main)
          .getAllByAltText(thumbnail.alt)
          .some((image) => image.getAttribute("src") === thumbnail.assetPath),
      ).toBe(true);
    }
  });
});

describe("ContactPage", () => {
  it("renders the preserved direct contact paths", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /contato/i }),
    ).toBeInTheDocument();

    const main = screen.getByRole("main");

    expect(
      within(main).getByRole("link", { name: portfolioData.contact.phoneLabel }),
    ).toHaveAttribute("href", portfolioData.contact.whatsappHref);
    expect(
      within(main).getByRole("link", { name: portfolioData.contact.email }),
    ).toHaveAttribute("href", portfolioData.contact.emailHref);

    for (const social of portfolioData.contact.socials) {
      expect(
        within(main).getByRole("link", { name: social.label }),
      ).toHaveAttribute("href", social.href);
    }
  });
});
