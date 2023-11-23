import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Alert,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

import { Link, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MatSidebar = () =>  {
  const googleAuth = new GoogleAuthProvider();
  const { userEmail, setUserEmail, isWhitelisted, setIsWhitelisted } = useContext(AppContext);

  console.log(userEmail);

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    const res = await axios.post(
      `http://localhost:3000/checkWhitelist?email=${result.user.email}`
    );

    console.log("Check Whitelist");
    console.log(res.data.whitelisted);
    setIsWhitelisted(res.data.whitelisted);

    console.log(result.user.email);
    setUserEmail(result.user.email);
  };

  const logout = async () => {
    await auth.signOut();
    setUserEmail(null);
  };

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

            <List>
              {userEmail && !isWhitelisted && (
                <>
                  <Link to="/collections">
                    <ListItem>
                      <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Collections
                    </ListItem>
                  </Link>

                  <Link to="/assets">
                    <ListItem>
                      <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Assets
                    </ListItem>
                  </Link>

                  <Link to="/users">
                    <ListItem>
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Users
                      {/* <ListItemSuffix>
                       <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                   </ListItemSuffix> */}
                    </ListItem>
                  </Link>

                  <Link to="/templates">
                    <ListItem>
                      <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Templates
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
                <ListItem onClick={()=> console.log("Check For Whitelist")}>
                  <ListItemPrefix>
                    <EyeIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Alert color="amber">
                   User is not Whitelisted 
                  </Alert>
                </ListItem>
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
}

export default MatSidebar;