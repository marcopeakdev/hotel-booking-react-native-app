import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "../components/NavBar";

// next.js's Image component lazy loads images and generates its own src attribute for
// each one. We can get around this and make image behavior more predictable by mocking
// the Image component as a simple <img> element with the provided src.
jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }) {
      /* eslint-disable @next/next/no-img-element */
      return <img src={src} alt={alt} />;
    }
);

const props = {
  logoSrc: "/logo.png",
  logoAltText: "logo",
  logoWidth: "164",
  logoHeight: "65",
  links: [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Venue",
      url: "/venue",
    },
    {
      text: "News",
      url: "/news",
    },
    {
      text: "Events",
      url: "/events",
    },
    {
      text: "Careers",
      url: "/careers",
    },
    {
      text: "Contact",
      url: "/contact",
    },
  ],
  dropdownLinks: [
    {
      text: "ORDER FOOD",
      url: "/kitchens",
      iconSrc: "icon-kitchens",
    },
    {
      text: "BOOK A STAY",
      url: "/stays",
      iconSrc: "icon-stays",
    },
    {
      text: "FIND WORKSPACE",
      url: "/coworking",
      iconSrc: "icon-coworking",
    },
    {
      text: "CATCH A RIDE",
      url: "/rides",
      iconSrc: "icon-rides",
    },
  ],
  iconObjects: [],
};

describe("NavBar tests", () => {
  test("Test that correct link text appears", async () => {
    render(<NavBar {...props} />);
    props.links.forEach((link) => {
      screen.getByRole("link", { name: link.text });
    });
  });

  test("Test that each link has the correct URL", async () => {
    render(<NavBar {...props} />);
    props.links.forEach((link) => {
      const linkElement = screen.getByRole("link", {
        name: link.text,
      }) as HTMLAnchorElement;
      expect(linkElement).toHaveAttribute("href", link.url);
    });
  });

  test("Test that links appear in the correct order", async () => {
    render(<NavBar {...props} />);
    const links = screen.getAllByRole("link");
    links.forEach((link, i) => {
      // The first and last links are hard-coded regardless of what props are received.
      if (i === 0) {
        expect(link).toHaveAttribute("href", "/");
        return;
      }
      if (i > props.links.length) {
        expect(link).toHaveTextContent("LOG IN");
        expect(link).toHaveAttribute("href", "/login");
        return;
      }
      expect(link).toHaveTextContent(props.links[i - 1].text);
    });
  });

  test("Test that correct logo appears", async () => {
    render(<NavBar {...props} />);
    const logo = screen.getByRole("img", {
      name: props.logoAltText,
    }) as HTMLImageElement;
    expect(logo).toHaveAttribute("src", props.logoSrc);
  });

  test("Test that correct logo appears if a different logo is used", async () => {
    const newLogoUrl = "/new_logo.png";
    const newLogoAltText = "new logo";
    render(
      <NavBar
        logoSrc={newLogoUrl}
        logoAltText={newLogoAltText}
        logoWidth={props.logoWidth}
        logoHeight={props.logoHeight}
        links={props.links}
        dropdownLinks={props.dropdownLinks}
        iconObjects={props.iconObjects}
      />
    );
    const logo = screen.getByRole("img", {
      name: newLogoAltText,
    }) as HTMLImageElement;
    expect(logo).toHaveAttribute("src", newLogoUrl);
  });

  test("Test that dropdown links appear after clicking dropdown", async () => {
    const user = userEvent.setup();
    render(<NavBar {...props} />);

    // Assert that dropdown links aren't present yet.
    props.dropdownLinks.forEach((link) => {
      const linkElt = screen.queryByRole("link", { name: link.text });
      expect(linkElt).not.toBeInTheDocument();
    });

    const dropdownButton = screen.queryByRole("button");
    await user.click(dropdownButton);

    // Assert that dropdown links are now present.
    props.dropdownLinks.forEach((link) => {
      screen.getByRole("link", { name: link.text });
    });

    // Click the button again and assert that the dropdown links
    // are again not present.
    await user.click(dropdownButton);
    props.dropdownLinks.forEach((link) => {
      const linkElt = screen.queryByRole("link", { name: link.text });
      expect(linkElt).not.toBeInTheDocument();
    });
  });
});
