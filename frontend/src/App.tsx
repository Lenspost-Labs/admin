import React from "react";
import { AppContextProvider } from "src/context";
import MantineAppShell from "./components/MantineAppShell";
import { Notifications } from "@mantine/notifications";

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
