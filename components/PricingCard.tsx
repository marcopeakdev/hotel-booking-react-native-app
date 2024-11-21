import { ReactElement } from "react";
import styles from "../styles/PricingCard.module.scss";

export interface AdditionalProps {
  text?: string;
  html?: string;
  icon?: ReactElement | string;
}

export interface CardProps {
  title?: string;
  icon?: ReactElement | string;
  description?: string;
  price?: string;
  priceBg?: string;
  additionals?: Array<AdditionalProps>;
  isAuth?: boolean;
  handleClick?: (screenName: string) => void;
}

export default function PricingCard({
  title,
  icon,
  description,
  price,
  additionals,
  priceBg,
  isAuth,
  handleClick,
}: CardProps) {
  // Don"t try to display the icon unless it's an actual element.
  let showIcon = true;
  if (!icon || typeof icon === "string") {
    showIcon = false;
  }

  return (
    <div key={title} className={styles.card}>
      <div className={styles.header}>
        {title && <h3>{title}</h3>}
        {showIcon && icon}
      </div>
      <div className={styles.priceRow}>
        <p
          className={styles.price}
          style={priceBg ? { background: priceBg } : {}}
        >
          {price}
        </p>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.benefits}>
        {additionals.map((item) => (
          <div className={styles.itemRow} key={item.text}>
            {item.icon && (
              <div style={{ position: "relative" }}>{item.icon}</div>
            )}
            {item.text && <p>{item.text}</p>}
            {item.html && (
              <div dangerouslySetInnerHTML={{ __html: item.html }} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        {!isAuth && (
          <>
            <a href="#" onClick={() => handleClick("create-account")}>
              SIGN UP
            </a>
            <a
              href="#"
              className={styles.outlineButton}
              onClick={() => handleClick("login")}
            >
              LOG IN
            </a>
          </>
        )}
        {isAuth && (
          <a href="#" onClick={() => handleClick("coworking-checkout")}>
            Continue
          </a>
        )}
      </div>
    </div>
  );
}

PricingCard.defaultProps = {
  icon: undefined,
  handleClick: (screenName) => {
    console.log("clicked", screenName);
  },
  additionals: [],
  title: "",
  description: "",
  price: "",
  priceBg: "",
  isAuth: false,
};
