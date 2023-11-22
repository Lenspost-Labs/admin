import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

import { useState } from "react";

export function MatSidebar() {
  const googleAuth = new GoogleAuthProvider();
  const [user, setUser] = useState(null);

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    // const res = await axios.post(
    //   `http://localhost:3000/checkWhitelist?email=${result.user.email}`
    // );
    console.log(result.user.email);
    setUser(result.user.email);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
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
            {user ? (
              <button className="bg-black" onClick={logout}>
                Sign Out
              </button>
            ) : (
              <button className="bg-black" onClick={login}>
                Sign In
              </button>
            )}
            <List>
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
                <ListItem>
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Logout
                </ListItem>
              </Link>
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
