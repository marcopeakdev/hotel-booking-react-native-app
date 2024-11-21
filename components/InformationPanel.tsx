import { ReactElement } from "react";
import styles from "../styles/InformationPanel.module.scss";

export interface InformationPanelProps {
  title?: string;
  isEdit?: boolean;
  onEdit?: () => void;
  children?: ReactElement[] | ReactElement;
}

export default function InformationPanel({
  title,
  isEdit,
  onEdit,
  children,
}: InformationPanelProps) {
  return (
    <div key={title} className={styles.card}>
      <div className={styles.header}>
        {title && <h3>{title}</h3>}
        {isEdit && (
          <a href="#" onClick={() => onEdit()}>
            Edit
          </a>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

InformationPanel.defaultProps = {
  title: "",
  isEdit: false,
  onEdit: () => {
    console.log("onEdit");
  },
  children: <p>No children</p>,
};
