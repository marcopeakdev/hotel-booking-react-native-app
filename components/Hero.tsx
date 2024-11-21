import Link from "next/link";
import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/Hero.module.scss";

export interface HeroProps {
  className?: string;
  header: string;
  body: string;
  linkUrl: string;
  linkText: string;
  background: ReactElement<ImageProps>;
}

export default function Hero({
  className,
  header,
  body,
  linkUrl,
  linkText,
  background,
}: HeroProps) {
  return (
    <div className={`${className} ${styles.hero}`}>
      <div className={styles.bg}>{background}</div>
      <h1>{header}</h1>
      <p>{body}</p>
      <Link href={linkUrl}>
        <a>{linkText}</a>
      </Link>
    </div>
  );
}

Hero.defaultProps = {
  className: "",
};
