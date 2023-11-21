import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
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

export function MatSidebar() {
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
