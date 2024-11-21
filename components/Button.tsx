import { MouseEventHandler } from "react";
import styles from "../styles/Button.module.scss";

export interface ButtonProps {
  type: "reset" | "submit" | "button";
  disabled: boolean;
  label: string;
  onClick?: MouseEventHandler;
}

export default function Button({
  type,
  label,
  disabled,
  onClick,
}: ButtonProps) {
  /* eslint-disable react/button-has-type */
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
  onClick: null,
};
