import { ChangeEventHandler } from "react";
import styles from "../styles/Input.module.scss";

export interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  required: boolean;
  value?: string;
}

export default function Input({
  id,
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  required,
}: InputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

Input.defaultProps = {
  value: "",
};
