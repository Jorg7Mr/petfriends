import axios from "axios";
import { useState } from "react";
import { API_URL } from "../env";

const useService = () => {
  const SERVICE_ENDPOINT = "/api/service";

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  // Create an axios instance with the base URL
  const api = axios.create({ baseURL: API_URL });

  const handleRequest = async (requestFunction) => {
    setIsLoading(true);
    try {
      const res = await requestFunction();
      setServices(res.data.services);
      return res.data;
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions to interact with the API
  const createService = async (serviceData) => {
    return handleRequest(() =>
      api.post(SERVICE_ENDPOINT + "/new", serviceData)
    );
  };

  const getAllServices = async () => {
    return handleRequest(() => api.get(SERVICE_ENDPOINT));
  };

  const updateService = async (id, serviceData) => {
    return handleRequest(() =>
      api.put(`${SERVICE_ENDPOINT}/update/${id}`, serviceData)
    );
  };

  const deleteService = async (id) => {
    return handleRequest(() => api.delete(`${SERVICE_ENDPOINT}/deleted/${id}`));
  };

  return {
    createService,
    getAllServices,
    updateService,
    deleteService,
    services,
    error,
    isLoading,
  };
};

export default useService;
