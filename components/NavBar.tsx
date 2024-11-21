import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NavBar.module.scss";
import DropDownNav from "./DropDownNav";
import ProfileIcon from "../public/images/profile_icon.svg";
import CircleLeft from "../public/images/chevron-circle-left.png";
import { useWindowDimensions } from "../hooks";

import { awsCurrentAuthenticatedUser } from "../helpers/awsAuthCalls";

export interface NavBarProps {
  logoSrc: string;
  logoLink: string;
  logoAltText: string;
  logoWidth: string;
  logoHeight: string;
  links: Array<{ text: string; url: string }>;
  dropdownLinks: Array<{ text: string; url: string; iconSrc: string }>;
  // This is a valid time to use the any type, since each icon will actually have a different type.
  // The array should contain functions with a unique type for each icon. That's just how webpack works.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  iconObjects: Array<any>;
  isBack: boolean;
}

export default function NavBar({
  logoSrc,
  logoAltText,
  logoWidth,
  logoHeight,
  links,
  dropdownLinks,
  iconObjects,
  isBack,
  logoLink,
}: NavBarProps) {
  // If the user's viewport is less than 768px wide, display a profile icon
  // instead of the words "LOG IN".
  const { width: vw } = useWindowDimensions();
  const mobileVersion = vw < 768;

  const [authedUser, setAuthedUser] = useState(false);
  console.log("navbar authedUser", authedUser);
  useEffect(() => {
    awsCurrentAuthenticatedUser()
      .then((user) => {
        console.log("useeffect navbar user", user);
        if (user) {
          setAuthedUser(true);
        }
        // setAuthedUser(user ? true : false);
      })
      .catch((error) => {
        console.log("going into errors");
        console.log("error authing", error);
      });
  }, []);

  return (
    <nav className={styles.nav}>
      {(!mobileVersion || (mobileVersion && !isBack)) && (
        <div className={styles.logo}>
          <Link href={logoLink ?? "/"}>
            <a>
              <Image
                src={logoSrc}
                alt={logoAltText}
                width={logoWidth}
                height={logoHeight}
              />
            </a>
          </Link>
        </div>
      )}
      {mobileVersion && isBack && (
        <div id="back_link">
          <a className={styles["back-link"]} href="#">
            <Image src={CircleLeft} alt="Circle" width="20px" height="20px" />
            <span className={styles["back-text"]}>Back</span>
          </a>
        </div>
      )}
      {!mobileVersion && (
        <ul className={styles["nav-links"]}>
          {links.map((link) => (
            <li key={link.text}>
              <Link href={link.url}>
                <a>{link.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <DropDownNav dropdownLinks={dropdownLinks} iconObjects={iconObjects} />
      {/* TODO: Replace login button with My Account button after implementing
      authentication */}
      {mobileVersion ? (
        <Link href="/login">
          <a className={styles["login-link"]}>
            <ProfileIcon />
          </a>
        </Link>
      ) : (
        <Link href={authedUser ? "/my-account" : "/login"}>
          <a className={styles["login-link"]}>
            {authedUser ? "MY ACCOUNT" : "LOG IN"}
          </a>
        </Link>
      )}
    </nav>
  );
}
