import Link from "next/link";
import Image from "next/image";
import CloseButton from "../public/images/close-button.png";
import Logo from "../public/images/kitchens_logo_black_text.png";
import styles from "../styles/FoodHeader.module.scss";

export default function FoodHeader({
  diningOption,
  diningOptionChoice,
  handleCloseMenu,
}: {
  diningOption: string;
  diningOptionChoice: string;
  handleCloseMenu: () => void;
}) {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a>
          <Image src={Logo} alt="Kitchens Logo" />
        </a>
      </Link>
      <div className={styles.progress}>
        <div className={styles["dining-option"]}>
          <span>{diningOption}</span>
          <span>{diningOptionChoice}</span>
        </div>
        <button type="button" onClick={handleCloseMenu}>
          <Image src={CloseButton} alt="Close" />
        </button>
      </div>
    </div>
  );
}
