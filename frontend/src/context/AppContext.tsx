// import { createContext, useState } from "react";
// import React from "react";
// export const AppContext = createContext({});

// const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

//   const [userEmail, setUserEmail] = useState<String>("");
//   const [isWhitelisted, setIsWhitelisted] = useState<Boolean>(false);
//   const [authToken, setAuthToken] = useState<String>(""); 

//   return (


//     <AppContext.Provider
//       value={{ userEmail, setUserEmail, isWhitelisted, setIsWhitelisted, authToken, setAuthToken}}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
import React, { createContext, useState } from 'react';

interface AppContextProps {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  isWhitelisted: boolean;
  setIsWhitelisted: React.Dispatch<React.SetStateAction<boolean>>;
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps>({
  userEmail: '',
  setUserEmail: () => {},
  isWhitelisted: false,
  setIsWhitelisted: () => {},
  authToken: '',
  setAuthToken: () => {},
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        userEmail,
        setUserEmail,
        isWhitelisted,
        setIsWhitelisted,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
