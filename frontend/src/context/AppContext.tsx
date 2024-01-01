import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface AppContextProps {
  userEmail: string;
  setUserEmail: (email: string) => void;
  isWhitelisted: boolean;
  setIsWhitelisted: (isWhitelisted: boolean) => void;
  authToken: string;
  setAuthToken: (token: string) => void;
  arrImagesS3Links: string[];
  setArrImagesS3Links: (links: string[]) => void;
  arrImagesMetadata: string[];
  setArrImagesMetadata: (metadata: string[]) => void;
  editUserIndex: number;
  setEditUserIndex: (index: number) => void;
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  collectionID: number; // Added missing property
  setCollectionID: (id: number) => void; // Added missing property
}

export const AppContext = createContext<AppContextProps>({
  userEmail: '',
  setUserEmail: () => {},
  isWhitelisted: false,
  setIsWhitelisted: () => {},
  authToken: '',
  setAuthToken: () => {},
  arrImagesS3Links: [],
  setArrImagesS3Links: () => {},
  arrImagesMetadata: [],
  setArrImagesMetadata: () => {},
  editUserIndex: 0,
  setEditUserIndex: () => {},
  currentTab: 0,
  setCurrentTab: () => {},
  collectionID: 0, // Added missing property
  setCollectionID: () => {}, // Added missing property
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>('');
  const [arrImagesS3Links, setArrImagesS3Links] = useState<string[]>([]);
  const [arrImagesMetadata, setArrImagesMetadata] = useState<string[]>([]);
  const [editUserIndex, setEditUserIndex] = useState<number>(1);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [collectionID, setCollectionID] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        userEmail,
        setUserEmail,
        isWhitelisted,
        setIsWhitelisted,
        authToken,
        setAuthToken,
        arrImagesS3Links,
        setArrImagesS3Links,
        arrImagesMetadata,
        setArrImagesMetadata,
        editUserIndex,
        setEditUserIndex,
        currentTab, 
        setCurrentTab,
        collectionID, // Added missing property
        setCollectionID, // Added missing property
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAuth = () => useContext(AppContext);