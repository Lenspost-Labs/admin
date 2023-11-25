import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Alert,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  EyeIcon,
  ServerStackIcon,
  CodeBracketIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";

import { Link, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const MatSidebar = () => {
  const googleAuth = new GoogleAuthProvider();
  const { userEmail, setUserEmail, isWhitelisted, setIsWhitelisted, authToken, setAuthToken } =
    useContext(AppContext);

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    console.log("In LoginFn", result.user.email);
    setUserEmail(result.user.email);

    await checkForWhitelist(result.user.email);
  };

  const checkForWhitelist = async (emailID) => {

    const emailPayload = {
      email: emailID,
    };

    const res = await axios.post(
      `http://localhost:3000/checkWhitelist`, emailPayload
    );

    console.log("Check Whitelist");
    console.log(res.data);

    localStorage.setItem("jwt", res.data.token);

    setAuthToken(res.data.token);
    setIsWhitelisted(res.data.whitelisted);
  };

  const logout = async () => {
    await auth.signOut();
    setUserEmail(null);
    setIsWhitelisted(false);
    setAuthToken(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedInUser");
  };

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("loggedInUser", userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      setUserEmail(localStorage.getItem("loggedInUser"));
    }
    checkForWhitelist(userEmail);
  }, [userEmail]);

  return (
    <>
      <div className="flex flex-row justify-start align-top">
        <div className="">
          <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
              <Typography variant="h5" color="blue-gray">
                Lenspost Admin
              </Typography>
            </div>

            <hr />

            {userEmail && (
              <div className="mb-0 p-4">
                <Typography variant="h6" color="blue-gray">
                  {userEmail}
                </Typography>
              </div>
            )}

            <hr />

            <List>
              {userEmail && isWhitelisted && (
                <>
                  <Link to="/fileToS3">
                    <ListItem>
                      <ListItemPrefix>
                        <CubeIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Upload Files to S3
                    </ListItem>
                  </Link>

                  <Link to="/getAssetJSON">
                    <ListItem>
                      <ListItemPrefix>
                        <CodeBracketIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Get Asset JSON
                    </ListItem>
                  </Link>

                  <Link to="/uploadToDb">
                    <ListItem>
                      <ListItemPrefix>
                        <ServerStackIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Upload to DB
                    </ListItem>
                  </Link>

                  <Link to="/deleteCache">
                    <ListItem>
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Delete specific Cache
                      {/* <ListItemSuffix>
                       <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                   </ListItemSuffix> */}
                    </ListItem>
                  </Link>

                  <Link to="/deleteCacheByPattern">
                    <ListItem>
                      <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Delete Cache by Pattern
                    </ListItem>
                  </Link>

                  <Link to="/settings">
                    <ListItem>
                      <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Settings
                    </ListItem>
                  </Link>

                  <Link to="/logout">
                    <ListItem onClick={logout}>
                      <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Logout
                    </ListItem>
                  </Link>
                </>
              )}

              {userEmail && !isWhitelisted && (
                <>
                  <ListItem onClick={() => console.log("Check For Whitelist")}>
                    <ListItemPrefix>
                      <EyeIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Alert color="amber">User is not Whitelisted</Alert>
                  </ListItem>

                  <ListItem onClick={logout}>
                    <ListItemPrefix>
                      <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Logout
                  </ListItem>
                </>
              )}

              {!userEmail && (
                <ListItem onClick={login}>
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Login
                </ListItem>
              )}
            </List>
          </Card>
        </div>

        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MatSidebar;
