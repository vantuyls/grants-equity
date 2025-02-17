import { render, screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import Index from "src/pages/index";

describe("Index", () => {
  it("renders alert with grants.gov link", () => {
    render(<Index />);

    const alert = screen.getByTestId("alert");
    const link = screen.getByRole("link", { name: /grants\.gov/i });

    expect(alert).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.grants.gov");
  });

  it("renders the goals section", () => {
    render(<Index />);

    const goalH2 = screen.getByRole("heading", {
      level: 2,
      name: /What's the goal?/i,
    });

    expect(goalH2).toBeInTheDocument();
  });

  it("passes accessibility scan", async () => {
    const { container } = render(<Index />);
    const results = await waitFor(() => axe(container));

    expect(results).toHaveNoViolations();
  });
});
