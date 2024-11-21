import { useState } from "react";
import styles from "../styles/TimePicker.module.scss";

const RefereceTime = ["am", "pm"];

const TIME_ARRAY = [
  {
    text: "8:00",
    key: 0,
    time_reference: 0,
  },
  {
    text: "8:30",
    key: 1,
    time_reference: 0,
  },
  {
    text: "9:00",
    key: 2,
    time_reference: 0,
  },
  {
    text: "9:30",
    key: 3,
    time_reference: 0,
  },
  {
    text: "10:00",
    key: 4,
    time_reference: 0,
  },
  {
    text: "10:30",
    key: 5,
    time_reference: 0,
  },
  {
    text: "11:00",
    key: 6,
    time_reference: 0,
  },
  {
    text: "11:30",
    key: 7,
    time_reference: 0,
  },
  {
    text: "12:00",
    key: 8,
    time_reference: 1,
  },
  {
    text: "12:30",
    key: 9,
    time_reference: 1,
  },
  {
    text: "1:00",
    key: 10,
    time_reference: 1,
  },
  {
    text: "1:30",
    key: 11,
    time_reference: 1,
  },
  {
    text: "2:00",
    key: 12,
    time_reference: 1,
  },
  {
    text: "2:30",
    key: 13,
    time_reference: 1,
  },
  {
    text: "3:00",
    key: 14,
    time_reference: 1,
  },
  {
    text: "3:30",
    key: 15,
    time_reference: 1,
  },
  {
    text: "4:00",
    key: 16,
    time_reference: 1,
  },
  {
    text: "4:30",
    key: 17,
    time_reference: 1,
  },
  {
    text: "5:00",
    key: 18,
    time_reference: 1,
  },
];

const getStyle = (items, item) => {
  if (items.length === 1) {
    return { padding: 3 };
  }
  let result: any = { paddingTop: 3, paddingBottom: 3 };
  if (items.indexOf(item) === 0) {
    result = { padding: 3, paddingRight: 0 };
  } else if (items.indexOf(item) === items.length - 1) {
    result = { padding: 3, paddingLeft: 0 };
  }
  return result;
};

export interface TimePickerProps {
  onChange: ([fromTime, toTime]: [string, string]) => void;
}

export default function TimePicker({ onChange }: TimePickerProps) {
  let [currentSelectedTime, setCurrentSelectedTime] = useState([]);

  const handleClickTime = (time) => {
    let result = [];
    if (!currentSelectedTime.length) {
      result.push(time);
    } else if (currentSelectedTime.length === 1) {
      if (currentSelectedTime[0] > time) {
        for (let i = time; i <= currentSelectedTime[0] - 1; i += 1) {
          result.push(i);
        }
      } else {
        for (let i = currentSelectedTime[0] + 1; i <= time; i += 1) {
          result.push(i);
        }
      }
    } else {
      result = [];
      currentSelectedTime = [];
      result.push(time);
    }
    const total = [...currentSelectedTime, ...result].sort();
    const fromElem = TIME_ARRAY.find((item) => item.key === total[0]);
    const toElem = TIME_ARRAY.find(
      (item) => item.key === total[total.length - 1]
    );
    onChange && onChange([fromElem.text, toElem.text]);
    setCurrentSelectedTime(total);
  };

  return (
    <div className={styles.timepicker}>
      <div className={styles.pickerContent}>
        {TIME_ARRAY.map((item) => (
          <div
            className={styles.timeContainer}
            style={
              currentSelectedTime.indexOf(item.key) > -1
                ? getStyle(currentSelectedTime, item.key)
                : {}
            }
            onClick={() => {
              handleClickTime(item.key);
            }}
            onKeyDown={() => {
              handleClickTime(item.key);
            }}
            role="button"
            key={item.key}
            tabIndex={0}
          >
            <div
              className={
                currentSelectedTime.indexOf(item.key) > -1
                  ? `${styles.selected} ${styles.disabledTime}`
                  : `${styles.disabledTime}`
              }
              style={
                currentSelectedTime.length > 1 &&
                (currentSelectedTime.indexOf(item.key) === 0 ||
                  currentSelectedTime.indexOf(item.key) ===
                    currentSelectedTime.length - 1)
                  ? { width: 67 }
                  : {}
              }
            >
              <p>{item.text}</p>
              <p>{RefereceTime[item.time_reference]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
