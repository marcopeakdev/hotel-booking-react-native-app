import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/Cowork.module.scss";

export interface ContainerProps {
  className?: string;
  header: string;
  body: string;
  background: ReactElement<ImageProps>;
}

export default function CoworkTopContainer({
  className,
  header,
  body,
  background,
}: ContainerProps) {
  return (
    <div className={`${className} ${styles.hero}`}>
      <div className={styles.bg}>{background}</div>
      <h1>{header}</h1>
      <p>{body}</p>
    </div>
  );
}

CoworkTopContainer.defaultProps = {
  className: "",
};
