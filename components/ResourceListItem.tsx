import { ReactElement } from "react";
import Link from "next/link";
import styles from "../styles/ResourceListItem.module.scss";

export interface CardProps {
  title?: string;
  price?: string;
  image?: ReactElement | string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  data?: any;
}

export default function ResourceListItem({
  title,
  image,
  price,
  description,
  linkUrl,
  linkText,
  data,
}: CardProps) {
  return (
    <div key={description} className={styles.card}>
      {image && <div className={styles.imageContainer}>{image}</div>}
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          {title && <h3>{title}</h3>}
          {price && <p>{price}</p>}
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <p>
            {data?.Allocation ?? 0} Seats{data?.internet ? " • Wifi" : ""} • TV{" "}
            {data?.AirConditioning ? " • AC" : ""}
            {data?.WhiteBoard ? " • Whiteboard" : ""}
          </p>
          {linkUrl && (
            <Link href={linkUrl}>
              <a className={styles.link}>
                <span>{linkText}</span>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

ResourceListItem.defaultProps = {
  data: {},
  title: "",
  image: "",
  price: "",
  description: "",
  linkUrl: "",
  linkText: "",
};
