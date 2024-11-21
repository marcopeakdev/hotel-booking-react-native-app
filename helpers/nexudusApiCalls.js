import axios from "axios";
import { BackendApi } from "./backendApi";

const api = new BackendApi(process.env.NEXT_PUBLIC_BACKEND_API_NEXUDUS_BASE);

export const getPublicEvents = () => {
  return axios
    .get(`${api.backendUrl}/events/public`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Public Events....", {
        endpoint: `${api.backendUrl}/events/public`,
        error,
      });
    });
};

export const getResources = () => {
  return axios
    .get(`${api.backendUrl}/resources`, api.config)
    .then((response) => {
      return response.data.Records;
    })
    .catch((error) => {
      console.log("### Error with Resources....", {
        endpoint: `${api.backendUrl}/resources`,
        error,
      });
    });
};

export const getPlans = () => {
  return axios
    .get(`${api.backendUrl}/plans`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Resources....", {
        endpoint: `${api.backendUrl}/plans`,
        error,
      });
    });
};

export const getTimepasses = () => {
  return axios
    .get(`${api.backendUrl}/timepasses`, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with Resources....', {
        endpoint: `${api.backendUrl}/timepasses`,
        error
      });
    });
};

export const addBooking = data => {
  return axios
    .post(`${api.backendUrl}/booking`, data, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with booking resource....', {
        endpoint: `${api.backendUrl}/booking`,
        error
      });
    });
};

export const purchasePlan = data => {
  return axios
    .post(`${api.backendUrl}/coworker`, data, api.config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('### Error with create Coworker....', {
        endpoint: `${api.backendUrl}/coworker`,
        error
      });
      return error?.response?.data
    });
};

