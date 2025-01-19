import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/Constants";
import handleAxiosError from "./handleAxiosError";
import { ReparationDto } from "../types/ReparationDto";
import { Reparation } from "../types/Reparation";
import { ReparationFilter } from "../types/ReparationFilter";

/**
 * Add a new reparation to the system.
 * @param reparationDto - The Reparation data transfer object.
 * @returns The next call number.
 */
const addReparation = async (reparationDto: ReparationDto): Promise<string> => {
  try {
    const { data }: AxiosResponse<string> = await axios.post(`${BASE_URL}/reparation/add`, reparationDto);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Retrieve reparations filtered by criteria.
 * @param reparationFilter - Filter criteria for reparations.
 * @param page - The page number for pagination.
 * @returns A list of filtered reparations.
 */
type Page<T> = {
  content: T[];
  totalPages: number;
  // autres propriétés si nécessaires...
};

const getFilteredReparation = async (reparationFilter: ReparationFilter, page: number): Promise<Page<Reparation>> => {
  const sanitizedFilter = Object.fromEntries(
    Object.entries(reparationFilter).filter(([_, value]) => value !== undefined)
  );

  try {
    const { data }: AxiosResponse<Page<Reparation>> = await axios.get(`${BASE_URL}/reparation/filtred`, {
      params: { ...sanitizedFilter, page },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};


/**
 * Initialize the call number for the first reparation.
 * @returns A call number to use when adding the first reparation.
 */
const initCallNumber = async (): Promise<string> => {
  try {
    const { data }: AxiosResponse<string> = await axios.get(`${BASE_URL}/reparation/callNumber`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Retrieve a reparation by its call number.
 * @param callNumber - The unique call number of the reparation.
 * @returns The reparation object.
 */
const getReparationByCallNumber = async (callNumber: string): Promise<Reparation> => {
  try {
    const { data }: AxiosResponse<Reparation> = await axios.get(`${BASE_URL}/reparation/byCallNumber`, {
      params: { callNumber },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Retrieve a reparation by its call number.
 * @param id - The id of the reparation.
 * @returns The reparation object.
 */
const getReparationById = async (id: number): Promise<Reparation> => {
  try {
    const { data }: AxiosResponse<Reparation> = await axios.get(`${BASE_URL}/reparation/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

const updateReparation = async (tasks: string, id: number): Promise<Reparation> => {
  console.log(tasks)
  try {
    const { data }: AxiosResponse<Reparation> = await axios.put(
      `${BASE_URL}/reparation/tasks/${id}`,
      null, // No request body is sent
      { params: { tasks } } // Send tasks as query parameters
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};


const reparationService = {
  addReparation,
  getFilteredReparation,
  initCallNumber,
  getReparationByCallNumber,
  getReparationById,
  updateReparation,
};

export default reparationService ;
