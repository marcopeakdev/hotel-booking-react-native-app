import { useState } from "react";
import Image from "next/image";
import imageDemo from "../public/images/default-food-image.png";
import { formatCurrency } from "../helpers/formatStrings";
import styles from "../styles/FoodItemContainer.module.scss";

import RewardPlus from "../public/images/reward-plus-icon.svg";
import RewardCheck from "../public/images/reward-check-icon.svg";

export interface FoodItemContainerProps {
  name: string;
  price: number;
  description: string;
  onPress: any;
  in_stock: any;
  groupImage: string;
  contentful: any;
  imageRight?: boolean;
  onCheck?: any;
  isReward?: boolean;
  checked?: boolean;
  lineGuid?: string;
  lineAvailability: any;
}

export default function FoodItemContainer({
  name,
  price,
  description,
  onPress,
  in_stock,
  groupImage,
  contentful,
  checked,
  imageRight,
  onCheck,
  isReward,
  lineGuid,
  lineAvailability,
}: FoodItemContainerProps) {
  const [isChecked, setChecked] = useState(false);

  const funImage =
    contentful && contentful?.fields?.photo?.fields?.file?.url
      ? `
            https:${contentful?.fields?.photo?.fields?.file?.url}
        `
      : imageDemo;

  const handleSelect = () => {
    if (onCheck) {
      onCheck(!isChecked);
    }
    setChecked(!isChecked);
  };

  const conditionalOnPress = () => {
    console.log("conditionalOnPress");
    console.log("in_stock", in_stock);
    console.log("lineAvailability", lineAvailability);
    if (in_stock && lineAvailability) {
      console.log("in stock and available");
      onPress();
    }
  };

  const conditionalHandleSelect = () => {
    if (in_stock && lineAvailability) {
      handleSelect();
    }
  };

  return (
    <button onClick={conditionalOnPress}>
      <div>
        <div>
          {!imageRight && (
            <div>
              <Image height="75" width="75" alt="4m" src={funImage} />
            </div>
          )}
          <div>
            <span>{name}</span>
            {!isReward ? (
              <span>{price && formatCurrency(price)}</span>
            ) : (
              <span>Redeem and add to order</span>
            )}
          </div>
          {imageRight && (
            <div>
              <Image height="75" width="75" alt="4m" src={funImage} />
              <button onClick={conditionalHandleSelect}>
                {isChecked && <RewardCheck active size="20px" color="black" />}
                {!isChecked && <RewardPlus size="20px" color="black" />}
              </button>
            </div>
          )}
        </div>
        {!isReward && groupImage && (
          <div>
            <Image height="75" width="75" alt="4m" src={groupImage} />
          </div>
        )}
        <p>{description}</p>
      </div>
    </button>
  );
}
