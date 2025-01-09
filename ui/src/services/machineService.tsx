import axios, { AxiosResponse } from "axios";
import { Machine } from "../types/Machine";
import { MachineDto } from "../types/MachineDto";
import { BASE_URL } from "../utils/Constants";
import handleAxiosError from "./handleAxiosError";

/**
 * Add a new machine to the system.
 * @param machineDto - The machine data transfer object.
 * @returns The newly created Machine object.
 */
const addMachine = async (machineDto: MachineDto): Promise<Machine> => {
  try {
    const { data }: AxiosResponse<Machine> = await axios.post(`${BASE_URL}/machine/add`, machineDto);
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
 * Update an existing machine's details.
 * @param machine - The updated machine object.
 * @returns The updated Machine object.
 */
const updateMachine = async (machine: Machine): Promise<Machine> => {
  try {
    const { data }: AxiosResponse<Machine> = await axios.put(`${BASE_URL}/machine/update`, machine);
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
 * Get all machines associated with a client's phone number.
 * @param phoneNumber - The client's phone number.
 * @returns A list of machines linked to the client.
 */
const getMachinesByClientPhoneNumber = async (phoneNumber: string): Promise<Machine[]> => {
  try {
    const { data }: AxiosResponse<Machine[]> = await axios.get(`${BASE_URL}/machine/all`, {
      params: { number: phoneNumber },
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
 * Get a machine by its unique ID.
 * @param id - The machine's unique identifier.
 * @returns The Machine object with the specified ID.
 */
const getMachineById = async (id: number): Promise<Machine> => {
  try {
    const { data }: AxiosResponse<Machine> = await axios.get(`${BASE_URL}/machine/get/${id}`);
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

// Export all machine-related API methods as a service.
const machineService = {
  addMachine,
  updateMachine,
  getMachineById,
  getMachinesByClientPhoneNumber,
};

export default machineService;
