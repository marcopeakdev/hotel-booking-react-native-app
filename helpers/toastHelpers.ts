import { useState } from "react";
import {
  getSchedules,
  getMenus,
  getDiningOptions,
  getTables,
} from "./toastApiCalls";
import { getEntriesByType } from "./contentfulApiCalls";
import {
  returnDayOfWeek,
  splitFullName,
  formatDateToTime,
} from "./formatStrings";
import { Table } from "../types/FoodTypes";

export function getTableByGuid(tables: { [key: string]: Table }, guid) {
  const returnTable = Object.entries(tables).filter(
    (table) => table[1].guid === guid
  );
  return returnTable;
}

export function getDiningOptionsByGuid(diningOptions, guid) {
  const returnDiningOption = diningOptions.filter(
    (option) => option.guid === guid
  );
  return returnDiningOption;
}

export async function getOpenTimes() {
  const schedules = await getSchedules();
  try {
    const { weekSchedule, daySchedules } = schedules.schedules;

    const todayScheduleID = weekSchedule[returnDayOfWeek()];
    const { openTime, closeTime } = daySchedules[todayScheduleID];

    return { openTime, closeTime };
  } catch (error) {
    console.log("Error with Schedules");
  }
}

export async function loadToastData() {
  const menuData = await getMenus();
  let foodLines;
  try {
    const menuArray = Object.entries(menuData.menus).filter((menu) => {
      return menu[1].visibility.includes("TOAST_ONLINE_ORDERING");
    });

    foodLines = menuArray;
  } catch (error) {
    console.log("Error with Menu Data ", error);
  }
  console.log("FOOD LINES", foodLines);

  const tables = await getTables();
  const diningOptions = await getDiningOptions();

  return { foodLines, tables, diningOptions };
}

export function setAvailableBlocks(
  openTimes,
  setMinimumStartTime,
  setScheduledAvailableBlocks,
  setScheduledTime
) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const closingSet = openTimes.closeTime.split(":");
  const closingObj = new Date(
    now.getFullYear(),
    now.getMonth(),
    closingSet[0] === "00" ? now.getDate() + 1 : now.getDate(),
    closingSet[0],
    closingSet[1],
    0,
    0
  );

  const openingSet = openTimes.openTime.split(":");
  const openingObj = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    openingSet[0],
    openingSet[1],
    0,
    0
  );

  const minimumStart = new Date();

  if (openingObj.valueOf() > now.valueOf()) {
    // Order happening before opening
    minimumStart.setHours(openingObj.getHours());
    minimumStart.setMinutes(openingObj.getMinutes() + 30);
  } else {
    // Order happening after opening
    if (minutes < 30) {
      // minumum start time is +1 hour, 0 minutes
      // If accessing at 12:01, minimum start time would be 1pm
      minimumStart.setHours(hours + 1, 0, 0, 0);
    } else {
      // minimum start time is +1 hour, 30 minutes
      // If accessing at 12:45, minimum start time would be 1:30
      minimumStart.setHours(hours + 1, 30, 0, 0);
    }
  }

  setMinimumStartTime(minimumStart);
  setScheduledTime(formatDateToTime(minimumStart));

  const hoursRemaining =
    (closingObj.getTime() - minimumStart.getTime()) / 1000 / 60 / 60;

  const availableBlocks = hoursRemaining * 2;

  let returnedBlocks = [];

  for (let i = 0; i < availableBlocks + 1; i++) {
    const availableDate = new Date(minimumStart);
    availableDate.setMinutes(availableDate.getMinutes() + 30 * i);

    returnedBlocks.push({
      availableDate,
      formattedDate: formatDateToTime(availableDate),
    });
  }

  setScheduledAvailableBlocks(returnedBlocks);
}

export async function getFoodLineContentful() {
  try {
    const contentful = await getEntriesByType("foodLine");
    return contentful;
  } catch (error) {
    console.log("Error getting Food Lines Contentful data");
    console.log(error);
  }
}

export async function getTiersContentful() {
  const data = await getEntriesByType("rewardTier");
  const tierData = data
    .filter((item) => item.fields.tag)
    .sort((a, b) => {
      if (a.fields.name < b.fields.name) {
        return -1;
      }
      if (a.fields.name > b.fields.name) {
        return 1;
      }
      return 0;
    });
  return tierData;
}
