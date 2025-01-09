import axios, { AxiosResponse } from 'axios';
import { Client } from '../types/Client';
import { BASE_URL } from '../utils/Constants';
import handleAxiosError from './handleAxiosError';



// Add a new client
const addClient = async (client: Partial<Client>): Promise<Client> => {
  try {
    const { data }: AxiosResponse<Client> = await axios.post(`${BASE_URL}/client/add`, client);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Get a client by phone number

const getClientByPhoneNumber = async (phoneNumber : string): Promise<Client> => {
  try {
    const { data }: AxiosResponse<Client> = await axios.get(`${BASE_URL}/client/get`, {
      params: { phoneNumber  },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Update client information
const updateClient = async (client: Partial<Client>): Promise<Client> => {
  try {
    const { data }: AxiosResponse<Client> = await axios.put(`${BASE_URL}/client/update`, client);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Delete a client
const deleteClient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/client/delete/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

// Export client service as a single object
const clientService = {
  addClient,
  getClientByPhoneNumber,
  updateClient,
  deleteClient,
};

export default clientService;
