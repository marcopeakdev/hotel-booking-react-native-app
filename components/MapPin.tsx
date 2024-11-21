import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/MapPin.module.scss";

export interface ContainerProps {
  className?: string;
  title?: string;
  lat: number;
  lng: number;
  pinImage?: ReactElement<ImageProps> | string;
}

export default function MapPin({
  className,
  title,
  pinImage,
  lat,
  lng,
}: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      id={`${lat.toString()}_${lng.toString()}`}
    >
      {pinImage && <div className={styles.imageContainer}>{pinImage}</div>}
      {title && (
        <div className={styles.contentContainer}>
          <h1>{title}</h1>
        </div>
      )}
    </div>
  );
}

MapPin.defaultProps = {
  className: "",
  title: "",
  pinImage: "",
};
