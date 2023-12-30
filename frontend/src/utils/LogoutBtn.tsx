import { Button } from "@mantine/core";
import React from "react";
import { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import { auth } from "src/firebase";

const LogoutBtn = () => {
  const { setUserEmail, setIsWhitelisted, setAuthToken } =
    useContext(AppContext);

  const fnLogout = async () => {
    await auth.signOut();

    setUserEmail("");
    setIsWhitelisted(false);
    setAuthToken("");
    localStorage.removeItem("jwt");
  };
  return (
    <>
      <Button fullWidth onClick={fnLogout} variant="light" color="red" size="xs" className="mt-8">
        {" "}
        Logout{" "}
      </Button>
    </>
  );
};

export default LogoutBtn;
