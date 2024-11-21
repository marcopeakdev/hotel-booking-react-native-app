import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import FoodLanding from "../components/FoodLanding";
import FoodMenu from "../components/FoodMenu";
import FoodLineTemplate, {
  FoodLineTemplateProps,
} from "../components/FoodLineTemplate";
import FoodItemTemplate, {
  FoodItemTemplateProps,
} from "../components/FoodItemTemplate";

import {
  getMenus,
  getRestaurantInfo,
  getTables,
  getDiningOptions,
  getOrders,
  getModifiers,
  getModifierOptions,
} from "../helpers/toastApiCalls";

import {
  getOpenTimes,
  setAvailableBlocks,
  loadToastData,
  getFoodLineContentful,
  getTiersContentful,
} from "../helpers/toastHelpers";

import { getEntriesByType } from "../helpers/contentfulApiCalls";

export async function getServerSideProps() {
  const openTimes = await getOpenTimes();
  const { foodLines, tables, diningOptions } = await loadToastData();
  const contentfulFoodLines = await getFoodLineContentful();
  const tierData = await getTiersContentful();
  const modifiers = await getModifiers();
  const modifierOptions = await getModifierOptions();
  return {
    props: {
      openTimes,
      foodLines,
      tables,
      contentfulFoodLines,
      tierData,
      modifiers,
      modifierOptions,
    },
  };
}

interface Section {
  name: string;
  args: any;
}

export default function Kitchens({
  openTimes,
  foodLines,
  tables,
  contentfulFoodLines,
  tierData,
}) {
  const router = useRouter();

  const [latestAWSPayload, setLatestAWSPayload] = useState(null);
  const [dineInClicked, setDineInClicked] = useState(false);
  const [pickUpClicked, setPickUpClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scheduledTable, setScheduledTable] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [currentSection, setCurrentSection] = useState<Section>({
    name: "landing",
    args: {},
  });

  // Setup available times for take-out
  const [minimumStartTime, setMinimumStartTime] = useState("");
  const [scheduledAvailableBlocks, setScheduledAvailableBlocks] =
    useState(null);
  useEffect(() => {
    setScheduledTable(tables[0].name);
    setAvailableBlocks(
      openTimes,
      setMinimumStartTime,
      setScheduledAvailableBlocks,
      setScheduledTime
    );
  }, []);

  function handleDineInClick(): void {
    if (dineInClicked) {
      setDineInClicked(false);
    } else {
      if (pickUpClicked) {
        setPickUpClicked(false);
      }
      setDineInClicked(true);
    }
  }

  function handlePickUpClick(): void {
    if (pickUpClicked) {
      setPickUpClicked(false);
    } else {
      if (dineInClicked) {
        setDineInClicked(false);
      }
      setPickUpClicked(true);
    }
  }

  function handleTimeTableChange(event): void {
    if (pickUpClicked) {
      setScheduledTime(event.target.value);
    } else {
      setScheduledTable(event.target.value);
    }
  }

  function goToMenu(): void {
    setCurrentSection({
      name: "menu",
      args: {},
    });
  }

  function exitMenu(): void {
    setCurrentSection({
      name: "landing",
      args: {},
    });
  }

  function handleOpenFoodLineMenu(params: FoodLineTemplateProps): void {
    setCurrentSection({
      name: "foodline",
      args: params,
    });
  }

  function handleOpenMenuItem(params: FoodItemTemplateProps): void {
    console.log("clicked item");
    setCurrentSection({
      name: "fooditem",
      args: params,
    });
  }

  // If a query parameter called `target` is provided, set the back button to
  // redirect to the path specified by `target`. Otherwise default to the home
  // page. When other pages link to /kitchens, they should link to /kitchens?target=<CURRENT_URL>.
  const backUrl =
    "target" in router.query && typeof router.query.target === "string"
      ? router.query.target
      : "/";

  let childComponent;

  switch (currentSection.name) {
    case "landing":
      childComponent = (
        <FoodLanding
          dineInClicked={dineInClicked}
          handleDineInClick={handleDineInClick}
          pickUpClicked={pickUpClicked}
          handlePickUpClick={handlePickUpClick}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          backUrl={backUrl}
          tables={tables}
          availableBlocks={scheduledAvailableBlocks}
          scheduledTime={scheduledTime}
          setScheduledTime={setScheduledTime}
          scheduledTable={scheduledTable}
          handleTimeTableChange={handleTimeTableChange}
          handleContinueClick={goToMenu}
        />
      );
      break;
    case "menu":
      childComponent = (
        <FoodMenu
          diningOption={dineInClicked ? "Dine-In" : "Take Out"}
          diningOptionChoice={dineInClicked ? scheduledTable : scheduledTime}
          handleCloseMenu={exitMenu}
          latestAWSPayload={latestAWSPayload}
          setLatestAWSPayload={setLatestAWSPayload}
          menus={foodLines}
          contentfulFoodLines={contentfulFoodLines}
          openFoodLineMenu={handleOpenFoodLineMenu}
          openMenuItem={handleOpenMenuItem}
        />
      );
      break;
    case "foodline":
      childComponent = (
        <FoodLineTemplate
          {...currentSection.args}
          diningOption={dineInClicked ? "Dine-In" : "Take Out"}
          diningOptionChoice={dineInClicked ? scheduledTable : scheduledTime}
          handleCloseMenu={exitMenu}
          openMenuItem={handleOpenMenuItem}
        />
      );
      break;
    case "fooditem":
      childComponent = (
        <FoodItemTemplate
          {...currentSection.args}
          diningOption={dineInClicked ? "Dine-In" : "Take Out"}
          diningOptionChoice={dineInClicked ? scheduledTable : scheduledTime}
          handleCloseMenu={exitMenu}
          handleClickFoodLine={handleOpenFoodLineMenu}
        />
      );
      break;

    default:
      childComponent = <div />;
  }

  return <>{childComponent}</>;
}
