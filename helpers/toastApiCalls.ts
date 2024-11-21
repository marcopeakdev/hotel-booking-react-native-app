import axios from "axios";
import { BackendApi } from "./backendApi";

import { MenuData } from "../types/FoodTypes";

const api = new BackendApi(process.env.NEXT_PUBLIC_BACKEND_API_TOAST_BASE);

console.log("Toast API Object", api);

export const getRestaurants = () => {
  return axios
    .get(`${api.backendUrl}/restaurants`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### ...Error with Getting Toast Restaurants", {
        endpoint: `${api.backendUrl}/restaurants`,
        error,
      });
    });
};

export const getRestaurantInfo = () => {
  return axios
    .get(`${api.backendUrl}/restaurant/info/`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Toast Restaurant Info.", {
        endpoint: `${api.backendUrl}/restaurant/info/`,
        error,
      });
    });
};

//getSchedules

export const getSchedules = () => {
  return axios
    .get(`${api.backendUrl}/restaurant/schedules/`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Toast Restaurant Schedules.", {
        endpoint: `${api.backendUrl}/restaurant/schedules/`,
        error,
      });
    });
};

// getMenus

export function getMenus(): Promise<MenuData> {
  return axios
    .get(`${api.backendUrl}/menus/`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Toast Menus.", {
        endpoint: `${api.backendUrl}/menus/`,
        error,
      });
    }) as Promise<MenuData>;
}

// getTables

export const getTables = () => {
  return axios
    .get(`${api.backendUrl}/tables/`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Toast Tables", {
        endpoint: `${api.backendUrl}/tables/`,
        error,
      });
    });
};

// getTables

export const getDiningOptions = () => {
  return axios
    .get(`${api.backendUrl}/diningOptions/`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Toast Dining Options", {
        endpoint: `${api.backendUrl}/diningOptions/`,
        error,
      });
    });
};

// getOrders

export const getOrders = async (date) => {
  const endpoint = date ? `${date}` : ``;
  return axios
    .get(`${api.backendUrl}/orders/${endpoint}`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get orders.", {
        endpoint: `${api.backendUrl}/orders/${endpoint}`,
        error,
      });
    });
};

// getModifers

export const getModifiers = async () => {
  return axios
    .get(`${api.backendUrl}/menu/modifiers/group`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get modifiers.", {
        endpoint: `${api.backendUrl}menu/modifiers/group`,
        error,
      });
    });
};

// getModiferOptions

export const getModifierOptions = async () => {
  return axios
    .get(`${api.backendUrl}/menu/modifiers/option`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get modifiers options.", {
        endpoint: `${api.backendUrl}menu/modifiers/option`,
        error,
      });
    });
};

// postOrder

export const postOrder = async (data) => {
  return axios
    .post(`${api.backendUrl}/order/`, data, api.getConfig("POST"))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Post Order", {
        endpoint: `${api.backendUrl}/order/`,
        error,
      });
    });
};

// updateOrderCheck

export const updateOrderCheck = async (oguid, cguid, data) => {
  return axios
    .post(
      `${api.backendUrl}/orders/update/${oguid}/checks/${cguid}/selections`,
      data,
      api.getConfig("POST")
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Update Order Check", {
        endpoint: `${api.backendUrl}/orders/update/${oguid}/checks/${cguid}/selections`,
        error,
      });
    });
};

// postPayment

export const postPayment = async (oguid, cguid, data) => {
  console.log(data);
  return axios
    .post(
      `${api.backendUrl}/orders/add/${oguid}/checks/${cguid}/payments`,
      data,
      api.getConfig("POST")
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Post Payment", {
        endpoint: `${api.backendUrl}/orders/add/${oguid}/checks/${cguid}/payments`,
        error,
      });
    });
};

export const listFoodOrdersByFoodOrderIdQuery = (foodOrderId) => {
  return `query {
          listFoodOrders(filter: {id: {eq: "${foodOrderId}"}}) {
          items {
            id
            userName
            selections {
              id
              quantity
              price
              name
              itemGuid
              itemGroupGuid
              foodOrderId
              modifiers
            }
            orderGuid
            checkGuid
            orderSubmitted
            orderTime
            groupId
            diningOptionGuid
            diningOptionName
            inviteAccepted
            readyToSubmit
            singlePayee
            tableGuid
            tableName
            userEmail
            userPhone
            userId
          }
        }
      }`;
};

export const parseModifierOptionData = (data) => {
  return data.map((item) => {
    return {
      isDefault: item.isDefault,
      leftTitle: item.name,
      guid: item.guid,
      value: item.price ? item.price : 0,
      rightTitle: item.price ? "+$" + item.price.toFixed(2) : "",
    };
  });
};

export const testFoodOrdersByFoodOrderIdQuery = (foodOrderId) => {
  return {
    query: `query FoodOrdersByFoodOrderId($id: ID){
        listFoodOrders(filter: {id: {eq: $id}}) {
          items {
            id
            userName
            selections {
              id
              quantity
              price
              name
              itemGuid
              itemGroupGuid
              foodOrderId
              modifiers
            }
            orderGuid
            checkGuid
            orderSubmitted
            orderTime
            groupId
            diningOptionGuid
            diningOptionName
            inviteAccepted
            readyToSubmit
            singlePayee
            tableGuid
            tableName
            userEmail
            userPhone
            userId
          }
        }
      }`,
    variables: { id: foodOrderId },
  };
};
