import React from 'react';
import { ReparationProvider } from './ReparationContext';


const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
     
        <ReparationProvider>
          {children}
        </ReparationProvider>
     
  );
};

export default AppProviders;
