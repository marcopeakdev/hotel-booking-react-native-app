import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/DetailContainer.module.scss";

export interface ContainerProps {
  className?: string;
  header: string;
  body?: ReactElement | string;
  background?: string;
  image?: ReactElement<ImageProps> | string;
}

export default function DetailContainer({
  className,
  header,
  body,
  background,
  image,
}: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ backgroundColor: background || "#fff" }}
    >
      <div className={styles.imageContainer}>{image}</div>
      <div className={styles.contentContainer}>
        <h1>{header}</h1>
        <div>{body}</div>
      </div>
    </div>
  );
}

DetailContainer.defaultProps = {
  className: "",
  body: "",
  background: "",
  image: "",
};
