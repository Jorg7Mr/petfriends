import axios from "axios";
import { useState } from "react";
import { API_URL } from "../env";

const usePet = () => {
  const PET_ENDPOINT = "/api/pet";

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState([]);
  // Create an axios instance with the base URL
  const api = axios.create({ baseURL: API_URL });

  const handleRequest = async (requestFunction) => {
    console.log("URL: ", API_URL);
    setIsLoading(true);
    try {
      const res = await requestFunction();
      setPets(res.data.pets);
      return res.data;
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Functions to interact with the API
  const createPet = async (petData) => {
    return handleRequest(() => api.post(PET_ENDPOINT + "/new", petData));
  };

  const getAllPets = async () => {
    return handleRequest(() => api.get(PET_ENDPOINT));
  };

  const getPetByID = async (id) => {
    return handleRequest(() => api.get(`${PET_ENDPOINT}/${id}`));
  };

  const updatePet = async (id, petData) => {
    return handleRequest(() =>
      api.put(`${PET_ENDPOINT}/update/${id}`, petData)
    );
  };

  const deletePet = async (id) => {
    return handleRequest(() => api.delete(`${PET_ENDPOINT}/deleted/${id}`));
  };

  return {
    createPet,
    getAllPets,
    getPetByID,
    updatePet,
    deletePet,
    pets,
    error,
    isLoading,
  };
};

export default usePet;
