import { ReactElement, useEffect } from "react";
import styles from "../styles/Modal.module.scss";

export interface ModalProps {
  header?: ReactElement | string;
  children?: ReactElement | string;
  footer?: ReactElement | string;
  show?: boolean;
}

export default function Modal({ header, children, footer, show }: ModalProps) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "none";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  if (!show) {
    return <div />;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {typeof header === "string" && <h3>{header}</h3>}
          {typeof header !== "string" && (
            <div className={styles.modalHeader}>{header}</div>
          )}
        </div>
        <div className={styles.content}>
          {children}

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  show: false,
  header: "",
  children: "",
  footer: "",
};
