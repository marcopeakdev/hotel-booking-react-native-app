import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/CoworkCard.module.scss";

export interface CardProps {
  title?: string;
  logoSrc?: string;
  logoWidth?: string;
  logoHeight?: string;
  icon?: ReactElement | string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
}

export default function CoworkCard({
  title,
  logoSrc,
  logoWidth,
  logoHeight,
  icon,
  description,
  linkText,
  linkUrl,
}: CardProps) {
  // Don't try to display the icon unless it's an actual element.
  let showIcon = true;
  if (!icon || typeof icon === "string") {
    showIcon = false;
  }

  return (
    <div key={description} className={styles.card}>
      <div className={styles.header}>
        {title && <h3>{title}</h3>}
        {!title && logoSrc && (
          <Image
            src={logoSrc}
            width={logoWidth}
            height={logoHeight}
            alt={linkText}
          />
        )}
        {showIcon && icon}
      </div>
      <p className={styles.description}>{description}</p>
      {linkUrl && (
        <Link href={linkUrl}>
          <a className={styles.link}>
            {showIcon && icon}
            <span>{linkText}</span>
          </a>
        </Link>
      )}
    </div>
  );
}

CoworkCard.defaultProps = {
  icon: undefined,
};
