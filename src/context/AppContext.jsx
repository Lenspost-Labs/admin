import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [userEmail, setUserEmail] = useState(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  return (
    <AppContext.Provider
      value={{ userEmail, setUserEmail, isWhitelisted, setIsWhitelisted }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
