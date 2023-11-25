import { MatSidebar } from "./components";
import { AppContextProvider } from "./context";

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
