import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/ThreeOverlappingImages.module.scss";

export interface ThreeOverlappingImagesProps {
  imageLeft: ReactElement<ImageProps>;
  imageRight: ReactElement<ImageProps>;
  imageBottom: ReactElement<ImageProps>;
}

export default function ThreeOverlappingImages({
  imageLeft,
  imageRight,
  imageBottom,
}: ThreeOverlappingImagesProps) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{imageLeft}</div>
      <div className={styles.right}>{imageRight}</div>
      <div className={styles.bottom}>{imageBottom}</div>
    </div>
  );
}
