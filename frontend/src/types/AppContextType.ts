interface AppContextProps {
    userEmail: string;
    setUserEmail: React.Dispatch<React.SetStateAction<string>>;
    isWhitelisted: boolean;
    setIsWhitelisted: React.Dispatch<React.SetStateAction<boolean>>;
    authToken: string;
    setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  }