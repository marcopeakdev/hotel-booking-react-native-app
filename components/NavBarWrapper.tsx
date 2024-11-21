import { useRouter } from "next/router";
import NavBar from "./NavBar";

export default function NavBarWrapper({
  className,
  logoSrc,
  isBack,
  logoLink,
}: {
  className?: string;
  logoSrc?: string;
  logoLink?: string;
  isBack?: boolean;
}) {
  const router = useRouter();
  // This is hard-coded temporarily.
  const navBarProps = {
    logoSrc: logoSrc || "/images/4m-white-logo.png",
    logoAltText: "4m Logo",
    logoWidth: "164",
    logoHeight: "65",
    links: [
      {
        text: "VENUE",
        url: "/venue",
      },
      {
        text: "CAREERS",
        url: "/careers",
      },
      {
        text: "CONTACT",
        url: "/contact",
      },
    ],
    // Each iconSrc property should be a path from the PWD starting with ./. Webpack will import
    // each icon using a context in the directory containing the SVG files.
    dropdownLinks: [
      {
        text: "ORDER FOOD",
        url: `/kitchens?target=${router.pathname}`,
        iconSrc: "./kitchens_icon.svg",
      },
      {
        text: "BOOK A STAY",
        url: "/stays",
        iconSrc: "./stays_icon.svg",
      },
      {
        text: "FIND WORKSPACE",
        url: "/coworking",
        iconSrc: "./coworking_icon.svg",
      },
      {
        text: "CATCH A RIDE",
        url: "/rides",
        iconSrc: "./rides_icon.svg",
      },
    ],
    iconObjects: [],
    isBack: isBack ?? false,
    logoLink: logoLink ?? "/",
  };

  // Create a context using all the SVG files in ../public/images.
  const svgDir = require.context(
    "!@svgr/webpack!../public/images",
    false,
    /\.svg/
  );

  // Use webpack to import each icon using the context we created.
  // Pass the actual icon as a React component to the NavBar.
  navBarProps.dropdownLinks.forEach((link) => {
    const icon = svgDir(link.iconSrc).default;
    navBarProps.iconObjects.push(icon);
  });

  return (
    <div className={className}>
      <NavBar {...navBarProps} />
    </div>
  );
}

NavBarWrapper.defaultProps = {
  className: "",
  logoSrc: "",
  isBack: false,
  logoLink: "/",
};
