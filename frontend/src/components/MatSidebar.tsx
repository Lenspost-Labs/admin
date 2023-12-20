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
import { auth } from "src/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "src/context/AppContext";
import React from "react";

const MatSidebar = () => {
  const googleAuth = new GoogleAuthProvider();
  const {
    userEmail,
    setUserEmail,
    isWhitelisted,
    setIsWhitelisted,
    setAuthToken,
  } = 
  useContext(AppContext);

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    console.log("In LoginFn", result.user.email);
    setUserEmail(result.user.email ?? '');

    await checkForWhitelist(result.user.email);
  };

  const checkForWhitelist = async (emailID: string | null) => {
    const emailPayload = {
      email: emailID,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/checkWhitelist`,
      emailPayload
    );

    console.log("Check Whitelist");
    console.log(res.data);

    localStorage.setItem("jwt", res.data.token);

    setAuthToken(res.data.token);
    setIsWhitelisted(res.data.whitelisted);
  };

  const logout = async () => {
    await auth.signOut();
    setUserEmail('');
    setIsWhitelisted(false);
    setAuthToken("");
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
      // setUserEmail(localStorage.getItem("loggedInUser") || "");
    }
    checkForWhitelist(userEmail);
  }, [userEmail]);

  return (
    <>
      <div className="flex flex-row justify-start align-top">
        <div className="">
          <Card className="h-[calc(100vh-1rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5" placeholder={undefined}>
            <div className="mb-2 p-4">
              <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                Lenspost Admin
              </Typography>
            </div>

            <hr />

            {userEmail && (
              <div className="mb-0 p-4">
                <Typography variant="h6" color="blue-gray" placeholder={undefined}>
                  {userEmail}
                </Typography>
              </div>
            )}

            <hr />

            <List placeholder={undefined}>
              {userEmail && isWhitelisted && (
                <>
                  <Link to="/oneStepUpload">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <CubeIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      One Step Upload
                    </ListItem>
                  </Link>

                  <Link to="/fileToS3">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <CubeIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Upload Files to S3
                    </ListItem>
                  </Link>

                  <Link to="/getAssetJSON">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <CodeBracketIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Get Asset JSON
                    </ListItem>
                  </Link>

                  <Link to="/uploadToDb">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <ServerStackIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Upload to DB
                    </ListItem>
                  </Link>

                  <Link to="/deleteCache">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Delete specific Cache
                      {/* <ListItemSuffix>
                       <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                   </ListItemSuffix> */}
                    </ListItem>
                  </Link>

                  <Link to="/deleteCacheByPattern">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <InboxIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Delete Cache by Pattern
                    </ListItem>
                  </Link>

                  <Link to="/templates">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <InboxIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Templates
                    </ListItem>
                  </Link>
                  <Link to="/users">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <InboxIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Users
                    </ListItem>
                  </Link>

                  <Link to="/settings">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <Cog6ToothIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Settings
                    </ListItem>
                  </Link>

                  <Link to="/logout">
                    <ListItem onClick={logout} placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <PowerIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Logout
                    </ListItem>
                  </Link>
                </>
              )}

              {userEmail && !isWhitelisted && (
                <>
                  <ListItem onClick={() => console.log("Check For Whitelist")} placeholder={undefined}>
                    <ListItemPrefix placeholder={undefined}>
                      <EyeIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Alert color="amber">User is not Whitelisted</Alert>
                  </ListItem>

                  <ListItem onClick={logout} placeholder={undefined}>
                    <ListItemPrefix placeholder={undefined}>
                      <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Logout
                  </ListItem>
                </>
              )}

              {!userEmail && (
                <ListItem onClick={login} placeholder={undefined}>
                  <ListItemPrefix placeholder={undefined}>
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
