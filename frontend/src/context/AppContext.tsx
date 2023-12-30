import React, { createContext, useState } from 'react';

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
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>('');
  const [arrImagesS3Links, setArrImagesS3Links] = useState<string[]>([]);
  const [arrImagesMetadata, setArrImagesMetadata] = useState<string[]>([]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;