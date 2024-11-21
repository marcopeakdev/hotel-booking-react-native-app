import { useState, useEffect } from "react";
import FoodHeader from "./FoodHeader";
import FoodItemContainer from "./FoodItemContainer";
import { FoodItemTemplateProps } from "./FoodItemTemplate";
import FilterChip from "./FilterChip";
import {
  getEntriesByType,
  getMenuEntries,
} from "../helpers/contentfulApiCalls";
import styles from "../styles/FoodLineTemplate.module.scss";

import { IN_STOCK_VALUE } from "../constants/food";
import { returnDayOfWeek } from "../helpers/formatStrings";

export interface FoodLineTemplateProps {
  payload: any;
  contentful: any;
  available: any;
}

interface FoodLineTemplateExtraProps {
  diningOption: string;
  diningOptionChoice: string;
  handleCloseMenu: () => void;
  openMenuItem: (params: FoodItemTemplateProps) => void;
}

export default function FoodLineTemplate({
  payload,
  contentful,
  available,
  diningOption,
  diningOptionChoice,
  handleCloseMenu,
  openMenuItem,
}: FoodLineTemplateProps & FoodLineTemplateExtraProps) {
  const { menuGroups } = payload;

  const todaysDay = returnDayOfWeek();
  let isAvailable = false;

  if (payload.availability.alwaysAvailable) {
    // Always Available, return this menu
    isAvailable = true;
  } else {
    let needTimeCheck = true;

    payload.availability.schedule.forEach((schedule) => {
      if (schedule.days.includes(todaysDay.toUpperCase())) {
        needTimeCheck = true;
      }
    });

    if (needTimeCheck) {
      // check times

      const now = new Date()
        .toLocaleTimeString("en-US", {
          timeZone: "EST",
          timeZoneName: "short",
        })
        .slice(0, 5);

      payload.availability.schedule.forEach((schedule) => {
        schedule.timeRanges.forEach((range) => {
          const { end, start } = range;

          if (end === "00:00" && start === "00:00") {
            isAvailable = true;
          } else if (now < end && now > start) {
            isAvailable = true;
          }
        });
      });
    }
  }
  const { description, hasBanner, bannerText } = contentful[0]?.fields ?? {};

  const [filters, setFilters] = useState([]);

  const handleFilterClick = (filter) => {
    if (filters.includes(filter)) {
      const filteredFilter = filters.filter((item) => item !== filter);
      setFilters(filteredFilter);
    } else {
      setFilters([...filters, filter]);
    }
  };

  const [contentfulFoodLines, setContentfulFoodLines] = useState(null);
  useEffect(() => {
    async function getContentfulFoodLines() {
      try {
        const foodline = await getEntriesByType("foodLine");
        const contentfulMenuItems = await getEntriesByType("menuItem");

        const mergedContentful = foodline.concat(contentfulMenuItems);

        setContentfulFoodLines(mergedContentful);
      } catch (error) {
        console.log("Error getting Food Lines", error);
      }
    }
    getContentfulFoodLines();
  }, [setContentfulFoodLines]);

  const foodLineData = {
    payload,
    contentful,
  };

  function handleOpenMenuItem(item, group) {
    openMenuItem({
      payload: { item, group, groupImage: payload.image },
      contentful: contentfulFoodLines.find(
        (content) => content.fields.guid === item.guid
      ),
      foodLineData,
    });
  }

  return (
    <div className={styles.wrapper}>
      <FoodHeader
        diningOption={diningOption}
        diningOptionChoice={diningOptionChoice}
        handleCloseMenu={handleCloseMenu}
      />
      <div>
        {menuGroups.map((group, index) => {
          return (
            <button
              onClick={() => {
                handleFilterClick(group.name);
              }}
              key={`${group.guid}-filterchips`}
            >
              <FilterChip
                name={group.name}
                active={filters.includes(group.name)}
              />
            </button>
          );
        })}
      </div>

      <div>
        {menuGroups.map((group, index) => {
          if (filters.length === 0) {
            return (
              <div key={`${group.guid}-unfilteredcontent`}>
                <div>
                  {[...group.name].map((char) => (
                    <span key={`${group.name}-${char}-caption-title`}>
                      {`${char} `}
                    </span>
                  ))}
                </div>
                {group.menuItems.map((item) => {
                  const in_stock_status =
                    item.inventoryStatus === IN_STOCK_VALUE;

                  const contentfulItem = contentfulFoodLines?.find(
                    (content) => content.fields.guid === item.guid
                  );

                  return (
                    <FoodItemContainer
                      name={item.name}
                      price={item.price}
                      description={item.description}
                      contentful={contentfulItem}
                      lineAvailability={isAvailable}
                      groupImage={payload.image}
                      in_stock={in_stock_status}
                      key={`${item.guid}-unfilteredcontent`}
                      onPress={() => handleOpenMenuItem(item, group)}
                    />
                  );
                })}
              </div>
            );
          }
          if (filters.includes(group.name)) {
            return (
              <div key={`${group.guid}-filteredcontent`}>
                <div>{group.name}</div>
                {group.menuItems.map((item) => {
                  const in_stock_status =
                    item.inventoryStatus === IN_STOCK_VALUE;

                  const contentfulItem = contentfulFoodLines?.find(
                    (content) => content?.fields?.guid === item.guid
                  );

                  return (
                    <FoodItemContainer
                      name={item.name}
                      price={item.price}
                      description={item.description}
                      contentful={contentfulItem}
                      lineAvailability={isAvailable}
                      groupImage={payload.image}
                      in_stock={in_stock_status}
                      key={`${item.guid}-filteredcontent`}
                      onPress={() => handleOpenMenuItem(item, group)}
                    />
                  );
                })}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div>
        <div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}
