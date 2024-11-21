import {
  useState,
  createElement,
  useEffect,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/DropDownNav.module.scss";
import DropDownArrow from "../public/images/drop_down_arrow.png";

export interface DropDownNavProps {
  dropdownLinks: Array<{ text: string; url: string; iconSrc: string }>;
  // This is a valid time to use the any type, since each icon will actually have a different type.
  // The array should contain functions with a unique type for each icon. That's just how webpack works.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  iconObjects: Array<any>;
}

// This hook will close the dropdown menu if the user clicks outside of it.
function useOutsideClick(
  ref: MutableRefObject<HTMLDivElement>,
  showDropdown: boolean,
  setShowDropdown: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && showDropdown) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, showDropdown, setShowDropdown]);
}

export default function DropDownNav({
  dropdownLinks,
  iconObjects,
}: DropDownNavProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLinkText, setLinkText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, showDropdown, setShowDropdown);

  return (
    <div ref={dropdownRef} className={styles["dropdown-section"]}>
      <div className={styles["dropdown-border"]}>
        <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
          I WANT TO
          <span className={styles["selected-link"]}>{selectedLinkText}</span>
          <span
            className={
              showDropdown
                ? styles["dropdown-arrow-show"]
                : styles["dropdown-arrow-noshow"]
            }
          >
            <Image src={DropDownArrow} alt="Drop down arrow" />
          </span>
        </button>
        {showDropdown && (
          <ul className={styles["dropdown-links"]}>
            {dropdownLinks.map((link, i) => (
              <li
                key={link.text}
                onMouseOver={() => setLinkText(link.text)}
                onMouseLeave={() => setLinkText("")}
                onFocus={() => setLinkText(link.text)}
                onBlur={() => setLinkText("")}
              >
                <Link href={link.url}>
                  <a
                    className={
                      selectedLinkText === link.text ? styles.hovering : ""
                    }
                  >
                    {iconObjects[i] && createElement(iconObjects[i])}
                    {link.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
