import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FoodIcon from "../public/images/view_all_icon.svg";
import SpecialsIcon from "../public/images/specials_icon.svg";
import RewardsIcon from "../public/images/rewards_icon.svg";
import styles from "../styles/FoodMenu.module.scss";
import { FoodLine } from "../types/FoodTypes";

import FoodHeader from "./FoodHeader";
import FilterButton from "./FilterButton";
import FilterChip from "./FilterChip";
import FoodLineContainer from "./FoodLineContainer";
import FoodItemContainer from "./FoodItemContainer";
import FoodLineTemplate, { FoodLineTemplateProps } from "./FoodLineTemplate";
import { FoodItemTemplateProps } from "./FoodItemTemplate";

import { returnDayOfWeek } from "../helpers/formatStrings";
import {
  DINE_IN,
  DINE_IN_NAME,
  IN_STOCK_VALUE,
  TAKE_OUT,
  TAKE_OUT_NAME,
} from "../constants/food";

export interface FoodMenuProps {
  diningOption: string;
  diningOptionChoice: string;
  handleCloseMenu: () => void;
  latestAWSPayload: any;
  setLatestAWSPayload: any;
  menus: Array<FoodLine>;
  contentfulFoodLines: Array<any>;
  openFoodLineMenu: (params: FoodLineTemplateProps) => void;
  openMenuItem: (params: FoodItemTemplateProps) => void;
}

export default function FoodMenu({
  diningOption,
  diningOptionChoice,
  handleCloseMenu,
  latestAWSPayload,
  setLatestAWSPayload,
  menus,
  contentfulFoodLines,
  openFoodLineMenu,
  openMenuItem,
}: FoodMenuProps) {
  // tag filter button selection (Beverages, Food, Specials, Rewards)
  const [filterSelection, setFilterSelection] = useState("");

  // full menu filter chips for menu groups
  const [filters, setFilters] = useState([]);

  const [allTierData, setTierData] = useState([]);

  const [selectMenuId, setSelectMenuId] = useState(null);

  const allMenuGroupNames = [];
  const allMenuGroups = [];
  let selectedMenu = null;

  let filteredMenus = menus;

  if (
    latestAWSPayload?.diningOptionName &&
    latestAWSPayload.diningOptionName === TAKE_OUT
  ) {
    // filter the menu

    filteredMenus = menus.filter((menu) => menu[1].name !== "Bar 19");
  }
  const availabilityList = {};

  filteredMenus.forEach((menu, index) => {
    // Availability

    const todaysDay = returnDayOfWeek();

    let isAvailable = false;

    if (menu[1].availability.alwaysAvailable) {
      // Always Available, return this menu
      isAvailable = true;
      availabilityList[menu[1].guid] = isAvailable;
    } else {
      let needTimeCheck = true;

      menu[1].availability.schedule.forEach((schedule) => {
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

        menu[1].availability.schedule.forEach((schedule) => {
          schedule.timeRanges.forEach((range) => {
            const { end, start } = range;

            if (end === "00:00" && start === "00:00") {
              isAvailable = true;
              availabilityList[menu[1].guid] = isAvailable;
            } else if (now < end && now > start) {
              isAvailable = true;
              availabilityList[menu[1].guid] = isAvailable;
            }
          });
        });
      }
    }

    if (!isAvailable) {
      availabilityList[menu[1].guid] = isAvailable;
    }

    // Create Menu Groups

    const { menuGroups, name } = menu[1];

    menuGroups.forEach((innerGroup) => {
      if (!allMenuGroupNames.includes(innerGroup.name)) {
        allMenuGroupNames.push(innerGroup.name);

        allMenuGroups.push({
          name: innerGroup.name,
          foodLineImage: menu[1].image,
          lineName: name,
          menuGroups: [
            {
              ...innerGroup,
              lineImage: menu[1].image,
              lineGuid: menu[1].guid,
              lineAvailability: isAvailable,
            },
          ],
        });
      } else {
        allMenuGroups[
          allMenuGroupNames.indexOf(innerGroup.name)
        ].menuGroups.push({
          ...innerGroup,
          lineImage: menu[1].image,
          lineGuid: menu[1].guid,
          lineAvailability: isAvailable,
        });
      }
      innerGroup.menuItems.forEach((individualMenu) => {
        if (individualMenu.guid === selectMenuId) {
          selectedMenu = individualMenu;
          selectedMenu.quantity = 1;
        }
      });
    });
  });

  const [selections, setSelections] = useState(
    selectedMenu ? [selectedMenu] : []
  );

  function handleFilterClick(filter) {
    if (filters.includes(filter)) {
      const filteredFilter = filters.filter((item) => item !== filter);
      setFilters(filteredFilter);
    } else {
      setFilters([...filters, filter]);
    }
  }

  const getCheckedStatus = (menuItem) => {
    return menuItem.guid === selectMenuId;
  };

  /* const getNextTierName = () => {
    let tier = allTierData[0];
    if (user.points < allTierData[0].fields.points) {
      tier = allTierData[0];
    } else if (user.points < allTierData[1].fields.points) {
      tier = allTierData[1];
    } else if (user.points < allTierData[2].fields.points) {
      tier = allTierData[2];
    }
    return tier.fields.name.toUpperCase();
  };

  const getRemainPointsForNextTier = () => {
    let remainPoints = 0;
    if (user.points < allTierData[0].fields.points) {
      remainPoints = allTierData[0].fields.points - user.points;
    } else if (user.points < allTierData[1].fields.points) {
      remainPoints = allTierData[1].fields.points - user.points;
    } else if (user.points < allTierData[2].fields.points) {
      remainPoints = allTierData[2].fields.points - user.points;
    }
    return remainPoints;
  }; */

  useEffect(() => {
    if (selectedMenu && selections && selections.length > 0) {
      setLatestAWSPayload({
        ...latestAWSPayload,
        selections: [...selections],
        paymentMethod: latestAWSPayload.paymentMethod,
      });
    }
  }, [latestAWSPayload, selectedMenu, selections, setLatestAWSPayload]);

  const filterButtons = allMenuGroupNames.map((group) => {
    return (
      <button
        onClick={() => {
          handleFilterClick(group);
        }}
        key={`${group}-filterchips`}
      >
        <FilterChip name={group} active={filters.includes(group)} />
      </button>
    );
  });

  function handleOpenMenuItem(item, group, groupImage, contentful) {
    console.log("handleOpenMenuItem");
    openMenuItem({
      payload: { item, group, groupImage },
      contentful,
    });
  }

  return (
    <div className={styles.menu}>
      <FoodHeader
        diningOption={diningOption}
        diningOptionChoice={diningOptionChoice}
        handleCloseMenu={handleCloseMenu}
      />
      <div className={styles.foodlines}>
        {filteredMenus.map((menu, index) => {
          return (
            <button type="button" key={menu[1].guid}>
              <FoodLineContainer
                onPress={() => {
                  console.log("contentfulFoodLines", contentfulFoodLines);
                  console.log("menu", menu);
                  openFoodLineMenu({
                    payload: menu[1],
                    available: availabilityList[menu[1].guid],
                    contentful: contentfulFoodLines.filter(
                      (content) => content.fields.menuGuid === menu[1].guid
                    ),
                  });
                }}
                image={menu[1].image}
                name={menu[1].name}
              />
            </button>
          );
        })}
      </div>

      <FilterButton
        selection="View All"
        current={filterSelection}
        icon={<FoodIcon />}
        setFilterSelection={setFilterSelection}
      />
      <FilterButton
        selection="Specials"
        current={filterSelection}
        icon={<SpecialsIcon />}
        setFilterSelection={setFilterSelection}
      />
      <FilterButton
        selection="Rewards"
        current={filterSelection}
        icon={<RewardsIcon />}
        setFilterSelection={setFilterSelection}
      />
      {(filterSelection === "View All" || filterSelection === "Specials") && (
        <>
          <div>{filterButtons}</div>

          {allMenuGroupNames.map((groupName, index) => {
            if (filters.length === 0) {
              return allMenuGroups
                .filter((group) => {
                  if (filterSelection === "Specials") {
                    const groupLength = group.menuGroups.filter(
                      (finalGroup) => {
                        return finalGroup.menuItems.filter((item) => {
                          let filteredTags = [];
                          if (filterSelection === "Specials") {
                            filteredTags = item.itemTags.filter(
                              (t) => t.name === "Special"
                            );
                          } else {
                            filteredTags = item.itemTags.filter(
                              (t) => t.name.indexOf("Tier") > -1
                            );
                          }
                          return filteredTags.length;
                        }).length;
                      }
                    );
                    return groupLength.length;
                  }
                  return true;
                })
                .map((group) => {
                  if (group.name === groupName) {
                    return (
                      <div>
                        <div>{group.name}</div>

                        {group.menuGroups.map((finalGroup) => {
                          return finalGroup.menuItems
                            .filter((item) => {
                              if (filterSelection === "Specials") {
                                let filteredTags = [];
                                filteredTags = item.itemTags.filter(
                                  (t) => t.name === "Special"
                                );
                                return filteredTags.length;
                              }
                              return true;
                            })
                            .map((item) => {
                              const in_stock_status =
                                item.inventoryStatus === IN_STOCK_VALUE;

                              console.log("item", item);
                              console.log("group", group);

                              return (
                                <FoodItemContainer
                                  name={item.name}
                                  price={item.price}
                                  description={item.description}
                                  in_stock={in_stock_status}
                                  groupImage={finalGroup.lineImage}
                                  lineGuid={finalGroup.lineGuid}
                                  lineAvailability={finalGroup.lineAvailability}
                                  onPress={() =>
                                    handleOpenMenuItem(
                                      item,
                                      finalGroup,
                                      group.foodLineImage,
                                      5
                                    )
                                  }
                                  contentful={contentfulFoodLines?.find(
                                    (content) =>
                                      content.fields.guid === item.guid
                                  )}
                                  key={`${item.guid}-unfilteredcontent`}
                                  imageRight={false}
                                  isReward={false}
                                  checked={getCheckedStatus(item)}
                                  onCheck={(checked) => {
                                    if (checked) {
                                      item.quantity = 1;
                                      selections.push(item);
                                    } else {
                                      const selectionIndex =
                                        selections.findIndex(
                                          (sel) => sel.guid === item.guid
                                        );
                                      if (selectionIndex > -1) {
                                        selections.splice(selectionIndex, 1);
                                      }
                                    }
                                    setLatestAWSPayload({
                                      ...latestAWSPayload,
                                      selections: [...selections],
                                      paymentMethod:
                                        latestAWSPayload.paymentMethod,
                                    });
                                    setSelections([...selections]);
                                  }}
                                />
                              );
                            });
                        })}
                      </div>
                    );
                  }
                  return null;
                });
            }
            if (filters.includes(groupName)) {
              return allMenuGroups
                .filter((group) => {
                  if (filterSelection === "Specials") {
                    const groupLength = group.menuGroups.filter(
                      (finalGroup) => {
                        return finalGroup.menuItems.filter((item) => {
                          let filteredTags = [];
                          if (filterSelection === "Specials") {
                            filteredTags = item.itemTags.filter(
                              (t) => t.name === "Special"
                            );
                          } else {
                            filteredTags = item.itemTags.filter(
                              (t) => t.name.indexOf("Tier") > -1
                            );
                          }
                          return filteredTags.length;
                        }).length;
                      }
                    );
                    return groupLength.length;
                  }
                  return true;
                })
                .map((group) => {
                  if (group.name === groupName) {
                    return (
                      <div key={`${group.guid}-unfilteredcontent`}>
                        <div>{group.name}</div>
                        {group.menuGroups.map((finalGroup) => {
                          return finalGroup.menuItems
                            .filter((item) => {
                              if (filterSelection === "Specials") {
                                let filteredTags = [];
                                filteredTags = item.itemTags.filter(
                                  (t) => t.name === "Special"
                                );
                                return filteredTags.length;
                              }
                              return true;
                            })
                            .map((item) => {
                              const in_stock_status =
                                item.inventoryStatus === IN_STOCK_VALUE;

                              // View All with Filter Chip

                              return (
                                <FoodItemContainer
                                  name={item.name}
                                  price={item.price}
                                  description={item.description}
                                  in_stock={in_stock_status}
                                  groupImage={finalGroup.lineImage}
                                  lineGuid={finalGroup.lineGuid}
                                  lineAvailability={finalGroup.lineAvailability}
                                  contentful={contentfulFoodLines?.find(
                                    (content) =>
                                      content.fields.guid === item.guid
                                  )}
                                  onPress={() =>
                                    handleOpenMenuItem(
                                      item,
                                      finalGroup,
                                      group.foodLineImage,
                                      5
                                    )
                                  }
                                  key={`${item.guid}-unfilteredcontent`}
                                  imageRight={false}
                                  isReward={false}
                                  checked={getCheckedStatus(item)}
                                  onCheck={(checked) => {
                                    if (checked) {
                                      item.quantity = 1;
                                      selections.push(item);
                                    } else {
                                      const selectionIndex =
                                        selections.findIndex(
                                          (sel) => sel.guid === item.guid
                                        );
                                      if (selectionIndex > -1) {
                                        selections.splice(selectionIndex, 1);
                                      }
                                    }
                                    setLatestAWSPayload({
                                      ...latestAWSPayload,
                                      selections: [...selections],
                                      paymentMethod:
                                        latestAWSPayload.paymentMethod,
                                    });
                                    setSelections([...selections]);
                                  }}
                                />
                              );
                            });
                        })}
                      </div>
                    );
                  }
                  return null;
                });
            }
            return null;
          })}
        </>
      )}
    </div>
  );
}

FoodMenu.defaultProps = {};
