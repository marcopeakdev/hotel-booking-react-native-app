import { JSXElementConstructor, ReactElement, useState } from "react";
import styles from "../styles/Tabbar.module.scss";

export interface TabBarItem {
  title: string;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
}

export interface TabbarProps {
  items: Array<TabBarItem>;
  selectedIndex?: number;
}

export default function Tabbar({ items, selectedIndex }: TabbarProps) {
  const [selected, setSelected] = useState(selectedIndex ?? 0);

  const handleClick = (tabIndex) => {
    setSelected(tabIndex);
  };

  return (
    <div className={styles.tabbarContainer}>
      <div className={styles.tabbarHeader}>
        {items.map((item, index) => (
          <div
            role="button"
            onClick={() => handleClick(index)}
            onKeyDown={() => handleClick(index)}
            className={
              selected === index
                ? `${styles.selected} ${styles.headerItem}`
                : styles.headerItem
            }
            key={`header_${item.title}`}
            tabIndex={0}
          >
            <h1>{item.title}</h1>
            <div className={styles.borderItem} />
          </div>
        ))}
      </div>
      <div className={styles.tabbarContent}>
        {items.map((item, index) => (
          <div
            key={`content_${item.title}`}
            style={
              selected === index ? { display: "block" } : { display: "none" }
            }
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

Tabbar.defaultProps = {
  selectedIndex: 0,
};
