import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [userEmail, setUserEmail] = useState(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [authToken, setAuthToken] = useState(null); 

  return (
    <AppContext.Provider
      value={{ userEmail, setUserEmail, isWhitelisted, setIsWhitelisted, authToken, setAuthToken}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
