import { ReactElement } from "react";
import { ImageProps } from "next/image";
import styles from "../styles/MainBgContainer.module.scss";

export interface ContainerProps {
  className?: string;
  contentClassName?: string;
  header: string;
  body?: ReactElement | string;
  background: ReactElement<ImageProps>;
  icon?: ReactElement<ImageProps> | string;
}

export default function MainBgContainer({
  className,
  contentClassName,
  header,
  icon,
  body,
  background,
}: ContainerProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.bg}>{background}</div>
      <div className={`${styles.contentContainer} ${contentClassName}`}>
        <div className={styles.icon}>{icon}</div>
        <h1>{header}</h1>
        <div>{body}</div>
      </div>
    </div>
  );
}

MainBgContainer.defaultProps = {
  className: "",
  contentClassName: "",
  body: "",
  icon: "",
};
