import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/DescriptionContainer.module.scss";

export interface ContainerProps {
  className?: string;
  header: string;
  body?: ReactElement;
  background?: string;
  rightImage?: ReactElement<ImageProps> | string;
  logo?: ReactElement<ImageProps> | string;
  rightImageStyle?: object;
  logoStyle?: object;
  addedContent?: ReactElement | string;
}

export default function DescriptionContainer({
  className,
  header,
  body,
  background,
  rightImage,
  rightImageStyle,
  addedContent,
  logo,
  logoStyle,
}: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ backgroundColor: background || "#fff" }}
    >
      {logo && (
        <div className={styles.logoBg} style={logoStyle}>
          {logo}
        </div>
      )}
      <div className={styles.contentContainer}>
        <div className={styles.addedContent}>{addedContent}</div>
        <h1>{header}</h1>
        <div>{body}</div>
      </div>
      <div className={styles.rightImageContainer} style={rightImageStyle || {}}>
        {rightImage}
      </div>
    </div>
  );
}

DescriptionContainer.defaultProps = {
  className: "",
  body: <div />,
  background: "",
  rightImage: "",
  logo: "",
  rightImageStyle: {},
  logoStyle: {},
  addedContent: "",
};
