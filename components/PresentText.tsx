import Link from "next/link";
import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/PresentText.module.scss";

export interface PresentTextProps {
  className?: string;
  topImage?: ReactElement<ImageProps>;
  header?: string;
  subheader?: string;
  body?: string;
  linkUrl: string;
  linkText: string;
  background: ReactElement<ImageProps>;
  align: "center" | "left";
}

export default function PresentText({
  className,
  topImage,
  header,
  subheader,
  body,
  linkUrl,
  linkText,
  background,
  align,
}: PresentTextProps) {
  return (
    <div
      className={`${className} ${styles.container} ${styles[`align-${align}`]}`}
    >
      <div className={styles.bg}>{background}</div>
      {topImage && topImage}
      {header && <h1>{header}</h1>}
      {subheader && <h2>{subheader}</h2>}
      {body && <p>{body}</p>}
      <Link href={linkUrl}>
        <a>{linkText}</a>
      </Link>
    </div>
  );
}

PresentText.defaultProps = {
  className: "",
  topImage: undefined,
  header: "",
  subheader: "",
  body: "",
};
