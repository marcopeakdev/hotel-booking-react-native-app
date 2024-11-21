import { ReactElement } from "react";
import styles from "../styles/ResourceTypeCard.module.scss";

export interface CardProps {
  title?: string;
  selected?: boolean;
  image?: ReactElement | string;
  onClick?: () => void;
}

export default function ResourceTypeCard({
  title,
  image,
  selected,
  onClick,
}: CardProps) {
  return (
    <div
      className={styles.card}
      role="button"
      onClick={() => onClick()}
      onKeyDown={() => onClick()}
      tabIndex={0}
    >
      {image && (
        <div
          className={styles.imageBorderContainer}
          style={
            selected ? { background: "linear-gradient(#9E81D2, #4D8FFB)" } : {}
          }
        >
          <div className={styles.contentContainer}>
            <div className={styles.imageContainer}>{image}</div>
          </div>
        </div>
      )}
      <div className={styles.header}>
        {title && <h3 style={selected ? { color: "black" } : {}}>{title}</h3>}
      </div>
    </div>
  );
}

ResourceTypeCard.defaultProps = {
  title: "",
  selected: false,
  image: "",
  onClick: () => {
    console.log("clicked");
  },
};
