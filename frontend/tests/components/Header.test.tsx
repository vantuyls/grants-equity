import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "src/components/Header";

const props = {
  logoPath: "/img/logo.svg",
  primaryLinks: [
    {
      i18nKey: "nav_link_home",
      href: "/",
    },
    {
      i18nKey: "nav_link_health",
      href: "/health",
    },
  ],
};

describe("Header", () => {
  it("toggles the mobile nav menu", async () => {
    render(<Header {...props} />);

    const menuButton = screen.getByRole("button", { name: /menu/i });

    expect(menuButton).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /health/i })).toHaveAttribute(
      "href",
      "/health"
    );

    await userEvent.click(menuButton);

    const closeButton = screen.getByRole("button", { name: /close/i });

    expect(closeButton).toBeInTheDocument();
  });

  it("displays expandable government banner", async () => {
    render(<Header />);

    const govBanner = screen.getByRole("button", { expanded: false });

    expect(govBanner).toBeInTheDocument();

    await userEvent.click(govBanner);

    expect(govBanner).toHaveAttribute("aria-expanded", "true");
  });
});
