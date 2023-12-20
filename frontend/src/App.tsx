import React from "react";
import { MatSidebar } from "src/components";
import { AppContextProvider } from "src/context";

const App = () => {
  return (
    <>
      <AppContextProvider>
        <MatSidebar />
      </AppContextProvider>
    </>
  );
};

export default App;
