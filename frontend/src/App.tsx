import React from "react";
import MantineAppShell from "./components/MantineAppShell";
import { Notifications } from "@mantine/notifications";
import AppContextProvider from "./context/AppContext";

const App = () => {

  return (
    <>
      <AppContextProvider>
        <Notifications position="top-right" />
        <MantineAppShell />
      </AppContextProvider>
    </>
  );
};

export default App;
