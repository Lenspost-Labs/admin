import { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "src/firebase";
import { Button } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";
import React from "react";
import { fnCheckWhitelist } from "./fnCheckWhitelist";
import { Navigate } from "react-router-dom";
const googleAuth = new GoogleAuthProvider();

const LoginBtn = () => {
  const { userEmail, setUserEmail, setAuthToken, setIsWhitelisted } =
    useContext(AppContext);

  const fnLogin = async () => {
    localStorage.removeItem("jwt");

    const result = await signInWithPopup(auth, googleAuth);

    console.log("In LoginFn", result.user.email);
    setUserEmail(result.user.email ?? "");

    const resWL = await fnCheckWhitelist(result.user.email ?? "");
    setIsWhitelisted(resWL?.whitelisted);
    setAuthToken(resWL?.token);
    localStorage.setItem("jwt", resWL?.token);
  };

  return (
    <div className="pt-32 flex flex-row align-middle justify-center">
      {userEmail && <Navigate to="/oneStepUpload" replace={true} />}

      <Button
        variant="light"
        size="compact-lg"
        leftSection={<IconBrandGoogle size={24} />}
        onClick={() => fnLogin()}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default LoginBtn;
