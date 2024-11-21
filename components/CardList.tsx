import { createElement } from "react";
import Card, { CardProps } from "./Card";
import styles from "../styles/CardList.module.scss";

export default function CardList({
  className,
  cards,
}: {
  className?: string;
  cards: Array<CardProps>;
}) {
  const iconObjects = [];

  // Create a context using all the SVG files in ../public/images.
  const svgDir = require.context(
    "!@svgr/webpack!../public/images",
    false,
    /\.svg/
  );

  cards.forEach((card) => {
    // When the CardList receives its props, the icons are stored as
    // strings, but the Card component expects icons to be stored as
    // actual ReactElements.
    if (typeof card.icon === "string") {
      const icon = svgDir(card.icon).default;
      iconObjects.push(icon);
    }
  });

  return (
    <div className={`${className} ${styles["card-list"]}`}>
      {cards.map((card, i) => (
        <Card
          logoSrc={card.logoSrc}
          logoWidth={card.logoWidth}
          logoHeight={card.logoHeight}
          icon={iconObjects[i] && createElement(iconObjects[i])}
          description={card.description}
          linkText={card.linkText}
          linkUrl={card.linkUrl}
          key={card.logoSrc}
        />
      ))}
    </div>
  );
}

CardList.defaultProps = {
  className: "",
};
