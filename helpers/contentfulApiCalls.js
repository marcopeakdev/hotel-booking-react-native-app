import axios from "axios";
import { BackendApi } from "./backendApi";

const api = new BackendApi(process.env.NEXT_PUBLIC_BACKEND_API_CONTENTFUL_BASE);

export const getEntries = () => {
  return axios
    .get(`${api.backendUrl}/entries`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Contentful Entries....", {
        endpoint: `${api.backendUrl}/entries`,
        error,
      });
    });
};

export const getMenuEntries = () => {
  return axios
    .get(`${api.backendUrl}/entries/menu`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Contentful Menu Entries.", {
        endpoint: `${api.backendUrl}/entries/menu`,
        error,
      });
    });
};

export const getEntryById = (id) => {
  return axios
    .get(`${api.backendUrl}/entry/${id}`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Contentful Entry by Id...", {
        endpoint: `${api.backendUrl}/entry/${id}`,
        error,
      });
    });
};

export const getEntriesByType = (type) => {
  return axios
    .get(`${api.backendUrl}/entries/type/${type}`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Contentful Entries by Type....", {
        endpoint: `${api.backendUrl}/entries/type/${type}`,
        error,
      });
    });
};
