import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Card.module.scss";

export interface CardProps {
  logoSrc: string;
  logoWidth: string;
  logoHeight: string;
  icon?: ReactElement | string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export default function Card({
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
        <Image
          src={logoSrc}
          width={logoWidth}
          height={logoHeight}
          alt={linkText}
        />
        {showIcon && icon}
      </div>
      <p className={styles.description}>{description}</p>
      <Link href={linkUrl}>
        <a className={styles.link}>
          {showIcon && icon}
          <span>{linkText}</span>
        </a>
      </Link>
    </div>
  );
}

Card.defaultProps = {
  icon: undefined,
};
