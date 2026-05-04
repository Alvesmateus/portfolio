import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the preserved portfolio identity", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /mateus alves/i }),
    ).toBeInTheDocument();
  });
});
