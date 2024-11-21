import Link from "next/link";
import styles from "../styles/ShoutOut.module.scss";

export interface ShoutOutProps {
  className?: string;
  topText: string;
  bottomText: string;
  leftLinkUrl: string;
  leftLinkText: string;
  rightLinkUrl: string;
  rightLinkText: string;
}

export default function ShoutOut({
  className,
  topText,
  bottomText,
  leftLinkUrl,
  leftLinkText,
  rightLinkUrl,
  rightLinkText,
}: ShoutOutProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <div className="text-lines">
        <p className={styles["top-text"]}>{topText}</p>
        <p>{bottomText}</p>
      </div>
      <Link href={leftLinkUrl}>
        <a className={styles["left-button"]}>{leftLinkText}</a>
      </Link>
      <Link href={rightLinkUrl}>
        <a className={styles["right-button"]}>{rightLinkText}</a>
      </Link>
    </div>
  );
}

ShoutOut.defaultProps = {
  className: "",
};
