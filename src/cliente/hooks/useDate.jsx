import axios from "axios";
import { useState } from "react";
import { API_URL } from "../env";

const useDate = () => {
  const DATE_ENDPOINT = "/api/date";

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  // Create an axios instance with the base URL
  const api = axios.create({ baseURL: API_URL });

  const handleRequest = async (requestFunction) => {
    setIsLoading(true);
    try {
      const res = await requestFunction();
      setDates(res.data.dates);
      return res.data;
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions to interact with the API
  const createNewDate = async (dateData) => {
    return handleRequest(() => api.post(DATE_ENDPOINT + "/new", dateData));
  };

  const findDates = async () => {
    return handleRequest(() => api.get(DATE_ENDPOINT));
  };

  const getAllDatesWithPets = async () => {
    return handleRequest(() => api.get(DATE_ENDPOINT + "/withPets"));
  };

  const updateDate = async (id, dateData) => {
    return handleRequest(() => api.put(`${DATE_ENDPOINT}/${id}`, dateData));
  };

  const deleteDate = async (id) => {
    return handleRequest(() => api.delete(`${DATE_ENDPOINT}/${id}`));
  };

  return {
    createNewDate,
    findDates,
    getAllDatesWithPets,
    updateDate,
    deleteDate,
    dates,
    error,
    isLoading,
  };
};

export default useDate;
