import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "../styles/MiniGallery.module.scss";

export interface MiniGalleryProps {
  className?: string;
  header: string;
  body: string;
  leftLinkText: string;
  leftLinkUrl: string;
  rightLinkText: string;
  rightLinkUrl: string;
}

// The child of the component will be rendered on the right.
export default function MiniGallery({
  className,
  header,
  body,
  leftLinkText,
  leftLinkUrl,
  rightLinkText,
  rightLinkUrl,
  children,
}: PropsWithChildren<MiniGalleryProps>) {
  return (
    <div className={`${className} ${styles["mini-gallery"]}`}>
      <div className={styles.left}>
        <h1>{header}</h1>
        <p>{body}</p>
        <Link href={leftLinkUrl}>
          <a className={styles["left-link"]}>{leftLinkText}</a>
        </Link>
        <Link href={rightLinkUrl}>
          <a className={styles["right-link"]}>{rightLinkText}</a>
        </Link>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}

MiniGallery.defaultProps = {
  className: "",
};
