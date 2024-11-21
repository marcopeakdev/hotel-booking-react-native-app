import { ReactElement } from "react";
import { LinkProps } from "next/link";
import { ImageProps } from "next/image";
import styles from "../styles/ToutBlock.module.scss";

export interface ToutBlockProps {
  className?: string;
  header: string;
  body: string;
  leftButton: ReactElement<ImageProps> | ReactElement<LinkProps>;
  rightButton: ReactElement<ImageProps> | ReactElement<LinkProps>;
  leftImage: ReactElement<ImageProps>;
}

export default function ToutBlock({
  className,
  header,
  body,
  leftButton,
  rightButton,
  leftImage,
}: ToutBlockProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles["image-wrapper"]}>{leftImage}</div>
      <div className={styles["right-container"]}>
        <h1>{header}</h1>
        <p>{body}</p>
        <div className={styles["button-wrapper"]}>
          {leftButton}
          {rightButton}
        </div>
      </div>
    </div>
  );
}

ToutBlock.defaultProps = {
  className: "",
};
