import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext<AppContextProps>({
  userEmail: '',
  setUserEmail: () => {},
  isWhitelisted: false,
  setIsWhitelisted: () => {},
  authToken: '',
  setAuthToken: () => {},

  // Step 1 : Upload to S3
  arrImagesS3Links: [],
  setArrImagesS3Links: () => {},

  // Step 2 : Get Asset JSON
  arrImagesMetadata: [],
  setArrImagesMetadata: () => {},

  editUserIndex: 0,
  setEditUserIndex: () => {},
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>('');
  const [arrImagesS3Links, setArrImagesS3Links] = useState<string[]>([]);
  const [arrImagesMetadata, setArrImagesMetadata] = useState<string[]>([]);
  const [editUserIndex, setEditUserIndex] = useState<number>(1);

  return (
    <AppContext.Provider
      value={{
        userEmail,
        setUserEmail,
        isWhitelisted,
        setIsWhitelisted,
        authToken,
        setAuthToken,

        // Step 1 : Upload to S3
        arrImagesS3Links,
        setArrImagesS3Links,

        // Step 2 : Get Asset JSON
        arrImagesMetadata,
        setArrImagesMetadata,

        editUserIndex,
        setEditUserIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAuth = () => useContext(AppContext);