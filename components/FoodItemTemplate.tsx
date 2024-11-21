import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import styles from "../styles/FoodItemTemplate.module.scss";
import FallbackImg from "../public/images/default-food-image.png";
import {
  getModifierOptions,
  getModifiers,
  listFoodOrdersByFoodOrderIdQuery,
  parseModifierOptionData,
  testFoodOrdersByFoodOrderIdQuery,
} from "../helpers/toastApiCalls";
import MinusIcon from "../public/images/minus-icon.svg";
import PlusIcon from "../public/images/plus-icon.svg";
import TabIcon from "../public/images/tab-icon.svg";
import { formatCurrency } from "../helpers/formatStrings";
import { createSelection } from "../graphql/mutations";
import FoodHeader from "./FoodHeader";
import AllergenTags from "./AllergenTags";
import OrderOptionsBox from "./OrderOptionsBox";

export interface FoodItemTemplateProps {
  payload: any;
  contentful: any;
  foodLineData?: { payload: any; contentful: any };
}

interface FoodItemTemplateExtraProps {
  diningOption: string;
  diningOptionChoice: string;
  handleCloseMenu: () => void;
  latestAWSPayload: any;
  setLatestAWSPayload: any;
  handleClickFoodLine: (params: { payload: any; contentful: any }) => void;
}

let selectedOptionValues = [];

export default function FoodItemTemplate({
  payload,
  contentful,
  foodLineData,
  diningOption,
  diningOptionChoice,
  handleCloseMenu,
  latestAWSPayload,
  setLatestAWSPayload,
  handleClickFoodLine,
}: FoodItemTemplateProps & FoodItemTemplateExtraProps) {
  const router = useRouter();
  const [optionsData, setOptionsData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [addedPrice, setAddedPrice] = useState(0);
  const [isFetching, setFetching] = useState(true);
  const [isRequiredSatisfied, setIsRequiredSatisfied] = useState(true);

  const isActiveOrder = latestAWSPayload
    ? Object.prototype.hasOwnProperty.call(latestAWSPayload, "id")
    : false;
  console.log("payload", payload);

  const {
    description,
    image,
    itemTags,
    modifierGroupReferences: itemModifierGroupReferences,
    name,
    price,
    guid,
  } = payload.item;

  const { group: groupGUID } = payload;
  const { groupImage } = payload;

  const [qty, setQty] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === "-" && qty > 1) {
      setQty(qty - 1);
    }

    if (type === "+") {
      setQty(qty + 1);
    }
  };

  const handleAddToTabAWS = async () => {
    const awsPayload = {
      name,
      foodOrderId: latestAWSPayload.id,
      itemGuid: guid,
      itemGroupGuid: groupGUID,
      price: payload.item.price + addedPrice,
      quantity: qty,
      modifiers: JSON.stringify(selectedOptionValues),
    };

    try {
      const { data: createRes } = (await API.graphql(
        graphqlOperation(createSelection, {
          input: awsPayload,
        })
      )) as GraphQLResult<any>;

      console.log("Create Selection Response", createRes);

      const { data: payloadRes } = (await API.graphql(
        testFoodOrdersByFoodOrderIdQuery(latestAWSPayload.id)
      )) as GraphQLResult<any>;

      console.log("AWS Payload Response", payloadRes);

      setLatestAWSPayload({
        ...(payloadRes.listFoodOrders.items[0] ?? {}),
        paymentMethod: latestAWSPayload.paymentMethod,
      });

      /* toast.show(tabAddItem); */
      selectedOptionValues = [];
      router.back();
    } catch (error) {
      console.log("Error Creating Selection");
      console.log(error);
      selectedOptionValues = [];
    }
  };

  const handleSelectOption = useCallback(
    (item, checked, isCheckbox, optionGuid) => {
      const options = Object.assign([], selectedOptionValues);
      if (isCheckbox) {
        const existIndex = options.findIndex(
          (opt) => opt.selectionId === item.guid
        );
        if (existIndex > -1) {
          options.splice(existIndex, 1);
        }
        if (checked) {
          options.push({
            modifierGuid: optionGuid,
            selectionId: item.guid,
            id: optionGuid,
            value: item.value,
          });
        }
      } else {
        const existIndex = options.findIndex(
          (opt) => opt.modifierGuid === optionGuid
        );
        if (existIndex > -1) {
          options.splice(existIndex, 1);
        }
        if (checked) {
          options.push({
            modifierGuid: optionGuid,
            selectionId: item.guid,
            id: optionGuid,
            value: item.value,
          });
        }
      }
      setSelectedOptions([...options]);
      selectedOptionValues = options;

      const priceValues = options.map((option) => option.value);
      if (priceValues) {
        const result = priceValues.reduce((total, val) => total + val, 0);
        setAddedPrice(result);
      }
    },
    [selectedOptions.length]
  );

  return (
    <div className={styles.wrapper}>
      <FoodHeader
        diningOption={diningOption}
        diningOptionChoice={diningOptionChoice}
        handleCloseMenu={handleCloseMenu}
      />
      <Image
        height="250"
        width="100%"
        alt="4m"
        src={
          contentful && contentful?.fields?.photo?.fields?.file?.url
            ? `https:${contentful?.fields?.photo?.fields?.file?.url}`
            : FallbackImg
        }
      />
      <div>
        <div>
          <span>{name}</span>
        </div>
        {isActiveOrder ? (
          <div>
            <button
              onClick={() => {
                handleQuantityChange("-");
              }}
            >
              <MinusIcon />
            </button>
            <span>{qty}</span>
            <button
              onClick={() => {
                handleQuantityChange("+");
              }}
            >
              <PlusIcon />
            </button>
          </div>
        ) : (
          <div>
            <span>{`${formatCurrency(price + addedPrice)}`}</span>
          </div>
        )}
      </div>
      <div>
        <div>
          <div>
            {/* Environment badge */}
            <div>
              <button
                onClick={() => {
                  handleClickFoodLine(foodLineData);
                }}
              >
                <Image
                  height="74"
                  width="74"
                  alt="4m"
                  src={groupImage || FallbackImg}
                />
              </button>
            </div>
            {/* span */}

            <div>
              <span>{name}</span>
              {!isActiveOrder && (
                <div>
                  <span>{`${formatCurrency(price + addedPrice)}`}</span>
                </div>
              )}
            </div>
          </div>

          {/* Incrementor */}
          {isActiveOrder && (
            <div>
              <button
                onClick={() => {
                  handleQuantityChange("-");
                }}
              >
                <MinusIcon />
              </button>
              <span>{qty}</span>
              <button
                onClick={() => {
                  handleQuantityChange("+");
                }}
              >
                <PlusIcon />
              </button>
            </div>
          )}
          <div>
            {description ? <span>{description}</span> : null}
            <AllergenTags data={itemTags} />
          </div>
          {optionsData.map((option) => {
            return (
              <OrderOptionsBox
                guid={option.guid}
                title={option.name}
                description={option.description}
                items={parseModifierOptionData(option.modifierOptionsData)}
                key={`option-${option.guid}`}
                isRequired={
                  !(
                    option.requiredMode === "OPTIONAL" ||
                    option.requiredMode === "OPTIONAL_FORCE_SHOW"
                  )
                }
                setIsRequiredSatisfied={setIsRequiredSatisfied}
                isCheckbox={option.isMultiSelect}
                onSelect={handleSelectOption}
              />
            );
          })}
          <span>
            Ask your concierge about menu items that are cooked to order or
            served raw. Consuming raw or undercooked meats, poultry, seafood,
            shellfish, or eggs may increase your risk of food borne illness.
          </span>
        </div>
      </div>

      {isActiveOrder && (
        <div>
          <button>
            <div>
              <div>
                <TabIcon />
                <span>Add to Tab</span>
              </div>
              <div>
                <span>
                  {`${formatCurrency(price * qty + addedPrice * qty)}`}
                </span>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
