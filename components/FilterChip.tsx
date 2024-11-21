import styles from "../styles/FilterChip.module.scss";
import CancelIcon from "../public/images/cancel-icon.svg";

export default function FilterChip({
  name,
  active,
}: {
  name: string;
  active: boolean;
}) {
  return (
    <div
      className={`${styles["filter-chip"]} ${active ? "active" : "inactive"}`}
    >
      <span>{name}</span>

      {active && (
        <div>
          <CancelIcon />
        </div>
      )}
    </div>
  );
}
