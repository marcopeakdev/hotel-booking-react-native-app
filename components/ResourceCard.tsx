import Link from "next/link";
import { ReactElement } from "react";
import styles from "../styles/ResourceCard.module.scss";

export interface CardProps {
  itemId?: string;
  title?: string;
  price?: string;
  image?: ReactElement | string;
  description?: string;
}

export default function ResourceCard({
  itemId,
  title,
  image,
  price,
  description,
}: CardProps) {
  return (
    <Link href={`/coworking/${title.replace(" ", "-").toLowerCase()}?listId=${itemId}`}>
      <div key={description} className={styles.card}>
        {image && <div className={styles.imageContainer}>{image}</div>}
        <div className={styles.header}>
          {title && <h3>{title}</h3>}
          {price && <p>{price}</p>}
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}

ResourceCard.defaultProps = {
  itemId: "",
  title: "",
  price: "",
  image: "",
  description: "",
};
