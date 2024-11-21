import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/FoodLanding.module.scss";

import Logo from "../public/images/kitchens_logo_black_text.png";
import CircleLeft from "../public/images/chevron-circle-left.png";
import FoodHero from "../public/images/food_hero.png";
import DineInIcon from "../public/images/dinein_icon.png";
import PickUpIcon from "../public/images/pickup_icon.png";
import KitchensIcon from "../public/images/kitchens_icon.svg";

import { Table } from "../types/FoodTypes";

export interface FoodLandingProps {
  backUrl: string;
  dineInClicked: boolean;
  handleDineInClick: () => void;
  pickUpClicked: boolean;
  handlePickUpClick: () => void;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  tables: {
    [key: string]: Table;
  };
  availableBlocks?: Array<{ availableDate: Date; formattedDate: string }>;
  scheduledTime: string;
  setScheduledTime: Dispatch<SetStateAction<string>>;
  scheduledTable: string;
  handleTimeTableChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleContinueClick: () => void;
}

export default function FoodLanding({
  dineInClicked,
  handleDineInClick,
  pickUpClicked,
  handlePickUpClick,
  name,
  setName,
  email,
  setEmail,
  backUrl,
  tables,
  availableBlocks,
  scheduledTime,
  setScheduledTime,
  scheduledTable,
  handleTimeTableChange,
  handleContinueClick,
}: FoodLandingProps) {
  const availableTableNumbers = Object.values(tables)
    .map((table) => table.name)
    .filter((tableName) => !!tableName);

  return (
    <div className={styles.landing}>
      <div className={styles.header}>
        <Image src={Logo} alt="Kitchens Logo" />
        <Link href={backUrl}>
          <a className={styles["back-link"]}>
            <Image src={CircleLeft} alt="Circle" />
            <span className={styles["back-text"]}>Back</span>
          </a>
        </Link>
      </div>

      <div className={styles["hero-wrapper"]}>
        <div className={styles.hero}>
          <Image src={FoodHero} alt="Person cooking" />
        </div>
      </div>

      <div className={styles["main-body"]}>
        <KitchensIcon />
        <h1>Lorem ipsum dolor sit amet</h1>
        <p>
          We serve up cuisines from five different restaurant lines and two
          different regional chefs. Order your favorite dish or discover new
          flavors. Just download the 4M app and filter by cuisine, type of meal,
          or chef. Sit back, work or catch up with friends, and your food will
          be out to the table for your prompt enjoyment.
        </p>
        <span className={styles["order-type"]}>CHOOSE YOUR ORDER TYPE:</span>
        <div className={styles.buttons}>
          <button
            className={`${styles["dine-in"]} ${
              dineInClicked && styles.clicked
            }`}
            onClick={handleDineInClick}
            type="button"
          >
            <Image src={DineInIcon} alt="Dine-In" />
            <div className={styles["button-text"]}>DINE-IN</div>
          </button>
          <button
            className={`${styles["pick-up"]} ${
              pickUpClicked && styles.clicked
            }`}
            onClick={handlePickUpClick}
            type="button"
          >
            <Image src={PickUpIcon} alt="Pick-Up" />
            <div className={styles["button-text"]}>PICK-UP</div>
          </button>
        </div>
      </div>
      {(dineInClicked || pickUpClicked) && (
        <div className={styles.bottom}>
          <div className={styles["input-group"]}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="dropdown">
              {dineInClicked ? "Select table number" : "Choose a pick-up time"}
            </label>
            <select
              value={dineInClicked ? scheduledTable : scheduledTime}
              name={dineInClicked ? "dineIn" : "pickUp"}
              id="dropdown"
              onChange={handleTimeTableChange}
            >
              {dineInClicked
                ? availableTableNumbers.map((tableNum) => (
                    <option key={tableNum} value={tableNum}>
                      {tableNum}
                    </option>
                  ))
                : availableBlocks.map((timeOption) => (
                    <option
                      key={timeOption.formattedDate}
                      value={timeOption.formattedDate}
                    >
                      {timeOption.formattedDate}
                    </option>
                  ))}
            </select>
          </div>
          <input
            type="button"
            name="submit"
            value="Continue"
            onClick={handleContinueClick}
          />
        </div>
      )}
    </div>
  );
}

FoodLanding.defaultProps = {
  availableBlocks: [],
};
