import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/StayItem.module.scss";

export interface ContainerProps {
  className?: string;
  title: string;
  description?: ReactElement | string;
  price?: string;
  itemImage?: ReactElement<ImageProps> | string;
}

export default function StayItem({
  className,
  title,
  description,
  price,
  itemImage,
}: ContainerProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.imageContainer}>{itemImage}</div>
      <div className={styles.contentContainer}>
        <h1>{title}</h1>
        <div>{description}</div>
        <div className={styles.priceContainer}>{price}</div>
      </div>
    </div>
  );
}

StayItem.defaultProps = {
  className: "",
  description: "",
  itemImage: "",
  price: "",
};
