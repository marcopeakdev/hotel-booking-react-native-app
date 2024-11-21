import axios from "axios";
import { BackendApi } from "./backendApi";

const api = new BackendApi(process.env.NEXT_PUBLIC_BACKEND_API_GUESTY_BASE);

// Calls that will need to be added to the Orchestrator / refactored here
export const getMessagesByGuestId = async (id) => {};

export const getGuestByPhoneGuesty = async (number) => {
  // Takes entered phone number and calls Guesty API
  // Returns results as array of Guest objects with that same number
  return axios
    .get(`${api.backendUrl}/guest/${number}`, api.config)
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log("### Error with Guest by Phone Search...", {
        endpoint: `${api.backendUrl}/guest/${number}`,
        error,
      });
    });
};

export const getReservationsByPhoneGuesty = (number) => {
  // Takes entered phone number and calls Guesty API
  // Returns an array of Reservation objects with that same number
  return axios
    .get(`${api.backendUrl}/reservations/phone/${number}`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error Reservations by Phone Search...", {
        endpoint: `${api.backendUrl}/reservations/phone/${number}`,
        error,
      });
    });
};

export const getReservationByIDGuesty = async (id) => {
  // Takes id and calls Guesty API
  // Returns a Rseervation object with that same id
  return axios
    .get(`${api.backendUrl}/reservations/id/${id}`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Reservation by Id Search", {
        endpoint: `${api.backendUrl}/reservations/id/${id}`,
        error,
      });
    });
};

export const postNewTask = async (data) => {
  return axios
    .post(`${api.backendUrl}/tasks`, data, api.getConfig("POST"))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Post New Task", {
        endpoint: `${api.backendUrl}/tasks/${JSON.stringify(data)}`,
        error,
      });
    });
};

export const getTasks = async () => {
  return axios
    .get(`${api.backendUrl}/tasks`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Tasks", {
        endpoint: `${api.backendUrl}/tasks`,
        error,
      });
    });
};

export const deleteTask = async (id) => {
  return axios
    .delete(`${api.backendUrl}/tasks/${id}`, api.getConfig("DELETE"))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(`### Error with Delete Task`, {
        endpoint: `${api.backendUrl}/tasks/${id}`,
        error,
      });
    });
};

export const cancelTask = async (data) => {
  return axios
    .put(`${api.backendUrl}/tasks`, data, api.getConfig("PUT"))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Cancel Task..", {
        endpoint: `${api.backendUrl}/tasks/${JSON.stringify(data)}`,
        error,
      });
    });
};

export const getListings = async () => {
  return axios
    .get(`${api.backendUrl}/listings`, api.config)
    .then((response) => {
      return response.data?.results;
    })
    .catch((error) => {
      console.log("### Error with Get Listings", {
        endpoint: `${api.backendUrl}/listings`,
        api,
        error: JSON.stringify(error),
      });
      return [];
    });
};

export const getListingById = async (id) => {
  return axios
    .get(`${api.backendUrl}/listings/${id}`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Listing By ID", {
        endpoint: `${api.backendUrl}/listings/${id}`,
        error,
      });
    });
};

export const getListingReviewsById = async (id) => {
  return axios
    .get(`${api.backendUrl}/reviews/listingId/${id}`, api.config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("### Error with Get Listing Reviews By ID", {
        endpoint: `${api.backendUrl}/reviews/listingId/${id}`,
        error,
      });
    });
};
