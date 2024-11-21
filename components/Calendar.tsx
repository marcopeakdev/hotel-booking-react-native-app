import { useState } from "react";
import Image from "next/image";
import CalendarBackIcon from "../public/images/calendar-back-icon.png";
import CalendarForwardIcon from "../public/images/calendar-forward-icon.png";
import styles from "../styles/Calendar.module.scss";
import { MONTH_NAMES, WEEK_DAY_NAMES } from "../constants/date";

function getFirstDayOfWeek(d) {
  // 👇️ clone date object, so we don't mutate it
  const date = new Date(d);
  const day = date.getDay(); // 👉️ get day of week

  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = date.getDate() - day + (day === 0 ? -6 : 1) - 1;

  return new Date(date.setDate(diff));
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
}

function getLastDayOfMonth(month) {
  return new Date(new Date().getFullYear(), month + 1, 0);
}

export interface CalendarProps {
  onChange: (params: any) => void;
}

export default function Calendar({ onChange }: CalendarProps) {
  const [current, setCurrent] = useState(new Date());
  const currentFirstDay = getFirstDayOfMonth(
    current.getFullYear(),
    current.getMonth()
  );
  const firstDay = getFirstDayOfWeek(currentFirstDay);
  const lastDay = getLastDayOfMonth(current.getMonth() - 1);
  const currentLastDay = getLastDayOfMonth(current.getMonth());

  const [currentDay, setCurrentDay] = useState(
    `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
  );

  const getLastMonthDays = () => {
    const fromDay = firstDay.getDate();
    const toDay = lastDay.getDate();
    const result = [];
    for (let i = fromDay; i <= toDay; i += 1) {
      result.push(i);
    }
    return result;
  };

  const getCurrentMonthDays = () => {
    const fromDay = currentFirstDay.getDate();
    const toDay = currentLastDay.getDate();
    const result = [];
    for (let i = fromDay; i <= toDay; i += 1) {
      result.push(i);
    }
    return result;
  };

  const getNextMonthDays = () => {
    const lastDays = getLastMonthDays();
    const currentDays = getCurrentMonthDays();
    const toValue = 42 - lastDays.length - currentDays.length;
    const result = [];
    for (let i = 1; i <= toValue; i += 1) {
      result.push(i);
    }
    return result;
  };

  const handleClickDay = (day) => {
    setCurrentDay(day);
    if (onChange) {
      onChange({
        text: `${WEEK_DAY_NAMES[new Date(day).getDay()]}, ${
          MONTH_NAMES[new Date(day).getMonth()]
        } ${new Date(day).getDate()}`,
        value: day,
      });
    }
  };

  const handleNextMonth = () => {
    setCurrent(
      new Date(current.getFullYear(), current.getMonth() + 1, current.getDate())
    );
  };

  const handlePrevMonth = () => {
    setCurrent(
      new Date(current.getFullYear(), current.getMonth() - 1, current.getDate())
    );
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.monthPicker}>
          <div
            onClick={() => handlePrevMonth()}
            onKeyDown={() => handlePrevMonth()}
            role="button"
            tabIndex={0}
          >
            <Image src={CalendarBackIcon} width={27} height={27} alt="Back" />
          </div>
          <div>
            {MONTH_NAMES[current.getMonth()]} {current.getFullYear()}
          </div>
          <div
            onClick={() => handleNextMonth()}
            onKeyDown={() => handleNextMonth()}
            role="button"
            tabIndex={0}
          >
            <Image
              src={CalendarForwardIcon}
              width={27}
              height={27}
              alt="Back"
            />
          </div>
        </div>
        <div className={styles.selectedDateText}>
          <p>
            {WEEK_DAY_NAMES[new Date(currentDay).getDay()]},{" "}
            {MONTH_NAMES[new Date(currentDay).getMonth()]}{" "}
            {new Date(currentDay).getDate()}
          </p>
        </div>
      </div>
      <div className={styles.calendarContent}>
        <div className={styles.calendarHeader}>
          <div>SU</div>
          <div>MO</div>
          <div>TU</div>
          <div>WE</div>
          <div>TH</div>
          <div>FR</div>
          <div>SA</div>
        </div>
        <div className={styles.monthContent}>
          {getLastMonthDays().map((item) => {
            const key = `${current.getFullYear()}-${currentFirstDay.getMonth()}-${item}`;
            return (
              <div
                className={styles.dayContainer}
                key={key}
                style={currentDay === key ? { padding: 3 } : {}}
                onClick={() => {
                  handlePrevMonth();
                  handleClickDay(key);
                }}
                onKeyDown={() => {
                  handlePrevMonth();
                  handleClickDay(key);
                }}
                role="button"
                tabIndex={0}
              >
                <div
                  className={
                    currentDay === key
                      ? `${styles.selected} ${styles.exceptDay}`
                      : `${styles.exceptDay}`
                  }
                >
                  {item}
                </div>
              </div>
            );
          })}
          {getCurrentMonthDays().map((item) => {
            const key = `${current.getFullYear()}-${
              currentFirstDay.getMonth() + 1
            }-${item}`;
            return (
              <div
                className={styles.dayContainer}
                key={key}
                style={currentDay === key ? { padding: 3 } : {}}
                onClick={() => handleClickDay(key)}
                onKeyDown={() => handleClickDay(key)}
                role="button"
                tabIndex={0}
              >
                <div className={currentDay === key ? styles.selected : ""}>
                  {item}
                </div>
              </div>
            );
          })}
          {getNextMonthDays().map((item) => {
            const key = `${current.getFullYear()}-${
              currentFirstDay.getMonth() + 2
            }-${item}`;
            return (
              <div
                className={styles.dayContainer}
                key={key}
                style={currentDay === key ? { padding: 3 } : {}}
                onClick={() => {
                  handleNextMonth();
                  handleClickDay(key);
                }}
                onKeyDown={() => {
                  handleNextMonth();
                  handleClickDay(key);
                }}
                role="button"
                tabIndex={0}
              >
                <div
                  className={
                    currentDay === key
                      ? `${styles.selected} ${styles.exceptDay}`
                      : `${styles.exceptDay}`
                  }
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
