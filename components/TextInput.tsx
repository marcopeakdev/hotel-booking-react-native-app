import { ChangeEvent } from "react";
import styles from "../styles/TextInput.module.scss";

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  id?: string;
  type?: string;
  className?: string;
  value?: string;
}

export default function TextInput({
  label,
  placeholder,
  onChange,
  id,
  type,
  className,
  value,
}: TextInputProps) {
  return (
    <div key={label} className={`${styles.inputContainer} ${className}`}>
      <label className={styles.inputLabel}>{label}</label>
      <div className={styles.contentContainer}>
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          value={value}
        />
      </div>
    </div>
  );
}

TextInput.defaultProps = {
  label: "",
  placeholder: "",
  onChange: () => {
    console.log("change");
  },
  id: "",
  className: "",
  type: "text",
  value: "",
};
