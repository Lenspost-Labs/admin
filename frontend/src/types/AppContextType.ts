interface AppContextProps {
    userEmail: string;
    setUserEmail: React.Dispatch<React.SetStateAction<string>>;
    isWhitelisted: boolean;
    setIsWhitelisted: React.Dispatch<React.SetStateAction<boolean>>;
    authToken: string;
    setAuthToken: React.Dispatch<React.SetStateAction<string>>;

    // Step 1 : Upload to S3
    arrImagesS3Links: string[];
    setArrImagesS3Links: React.Dispatch<React.SetStateAction<string[]>>;

    // Step 2 : Get Asset JSON
    arrImagesMetadata: string[];
    setArrImagesMetadata: React.Dispatch<React.SetStateAction<string[]>>;

    editUserIndex: number;
    setEditUserIndex: React.Dispatch<React.SetStateAction<number>>;
  }