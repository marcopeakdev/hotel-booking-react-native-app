import { useState } from "react";
import Image from "next/image";
import BagelsBg from "../public/images/bagels-bg.png";
import PlusIcon from "../public/images/plus-icon.png";
import styles from "../styles/AddonPicker.module.scss";
import { ADD_ON_ITEMS } from "../constants/food";

export interface AddonPickerProps {
  items?: Array<any>;
  onChange: (productId: Array<number>) => void;
}

export default function AddonPicker({ items, onChange }: AddonPickerProps) {
  const [activeProducts, setActiveProducts] = useState([]);

  const handleClickPlus = (productId) => {
    let cloneProductIds = Object.assign([], activeProducts);
    const existIndex = cloneProductIds.findIndex((item) => item === productId);
    let totalIds = [];
    if (existIndex > -1) {
      cloneProductIds.splice(existIndex, 1);
      totalIds = cloneProductIds;
    } else {
      totalIds = [...cloneProductIds, productId];
    }
    setActiveProducts(totalIds);
    onChange && onChange(productId);
  };

  return (
    <div className={styles.addonpicker}>
      <div className={styles.pickerContent}>
        {ADD_ON_ITEMS.map((item) => (
          <div className={styles.itemContainer} key={item.id}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative" }}>
                <Image src={BagelsBg} width={85} height={85} alt="Back" />
              </div>
              <div
                className={
                  activeProducts.indexOf(item.id) > -1
                    ? `${styles.plusButton} ${styles.selected}`
                    : styles.plusButton
                }
                role="button"
                onClick={() => handleClickPlus(item.id)}
                onKeyDown={() => handleClickPlus(item.id)}
              >
                <Image src={PlusIcon} width={29} height={29} alt="Back" />
              </div>
            </div>
            <p className={styles.titleStyle}>{item.name}</p>
            <p className={styles.priceStyle}>
              {item.price ? `$${item.price.toFixed(2)}` : "$0.00"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

AddonPicker.defaultProps = {
  items: [],
};
