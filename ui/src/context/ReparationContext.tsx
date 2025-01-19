// src/context/ReparationContext.js
import { createContext, ReactNode, useContext, useState } from 'react';
import { Reparation } from '../types/Reparation'; // Assuming you have this type defined
import reparationService from '../services/reparationService';
import { useCallback } from 'react';
import { Client } from '../types/Client';
import { Machine } from '../types/Machine';
// Define the type for the context value
interface ReparationContextType {
    reparation: Reparation | null;
    updateReparation: (descriptionTravail: string, id: number) => Promise<void>;
    fetchReparation: (id: string) => Promise<void>;
    updateReparationClient: (client : Client) => void ;
    updateReparationMachine :(machine : Machine) => void ;
  }
  
// Create a Context for the Reparation state, typed with ReparationContextType
const ReparationContext = createContext<ReparationContextType | null>(null);

interface ReparationProviderProps {
    children: ReactNode; // This ensures 'children' has the correct type
  }
// Provider component to wrap the app and provide state
export const ReparationProvider = ({ children }: ReparationProviderProps) => {
  const [reparation, setReparation] = useState<Reparation | null>(null);

  

const updateReparation = useCallback(async (descriptionTravail: string, id: number) => {
  try {
    const response = await reparationService.updateReparation(descriptionTravail, id);
    setReparation((prevReparation) => {
      // Ensure that prevReparation is not null before updating
      if (!prevReparation) {
        return response; // If prevReparation is null, just set the response
      }
      return {
        ...prevReparation,
        ...response, // Spread the response to update fields
      };
    });
  } catch (error) {
    console.error('Failed to update reparation:', error);
  }
}, []); // Add dependencies if needed

const fetchReparation = useCallback(async (id: string) => {
  if (!id) return; // Check if the ID is valid
  try {
    const reparationId = parseInt(id, 10); // Ensure the ID is an integer
    const response = await reparationService.getReparationById(reparationId);
    setReparation(response); // Set the reparation data after fetching
  } catch (error) {
    console.error('Failed to fetch reparation:', error);
  }
}, []); // Add dependencies if needed


const updateReparationClient = useCallback((client: Client) => {
  setReparation((prev) => {
    if (!prev) return null; // Handle the case where prev is null

    return {
      ...prev,
      machine: {
        ...prev.machine,
        client, // Update the client property
      },
    };
  });
}, []);

const updateReparationMachine = useCallback((machine: Machine) => {
  setReparation((prev) => {
    if (!prev) return null; // Handle the case where prev is null

    return {
      ...prev,
      machine, // Replace the existing machine with the new one
    };
  });
}, []);


  return (
    <ReparationContext.Provider value={{ reparation, updateReparation, fetchReparation , updateReparationClient,updateReparationMachine}}>
      {children}
    </ReparationContext.Provider>
  );
};

// Custom hook to use the reparation context
export const useReparation = () => {
  const context = useContext(ReparationContext);
  if (!context) {
    throw new Error('useReparation must be used within a ReparationProvider');
  }
  return context;
};
