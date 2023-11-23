import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  CollectionsPage,
  AssetsPage,
  UsersPage,
  TemplatesPage,
  LogoutPage,
  SettingsPage,
  ErrorPage,
} from "./routes";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/collections",
        element: <CollectionsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/assets",
        element: <AssetsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/templates",
        element: <TemplatesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
