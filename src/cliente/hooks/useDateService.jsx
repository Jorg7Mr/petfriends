import axios from "axios";
import { useState } from "react";
import { API_URL } from "../env";

const useDateService = () => {
  const DATE_ENDPOINT = "/api/dateService";

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  // Create an axios instance with the base URL
  const api = axios.create({ baseURL: API_URL });

  const handleRequest = async (requestFunction) => {
    setIsLoading(true);
    try {
      const res = await requestFunction();
      setDates(res.data.dateServices);
      return res.data;
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions to interact with the API
  const createNewDateService = async (dateServiceData) => {
    return handleRequest(() =>
      api.post(DATE_ENDPOINT + "/new", dateServiceData)
    );
  };

  const getAllDateServices = async () => {
    return handleRequest(() => api.get(DATE_ENDPOINT));
  };

  const getAllDateServicesWithService = async () => {
    return handleRequest(() => api.get(DATE_ENDPOINT + "/withServices"));
  };

  const updateDateService = async (id, newState) => {
    return handleRequest(() => api.put(`${DATE_ENDPOINT}/${id}`, { newState }));
  };

  return {
    createNewDateService,
    getAllDateServices,
    getAllDateServicesWithService,
    updateDateService,
    dates,
    error,
    isLoading,
  };
};

export default useDateService;
