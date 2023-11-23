import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AssetsPage,
  UsersPage,
  TemplatesPage,
  LogoutPage,
  SettingsPage,
  ErrorPage,
  FileToS3Page,
} from "./routes";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/fileToS3",
        element: <FileToS3Page />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/getAssetJSON",
        element: <AssetsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/deleteCache",
        element: <UsersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/deleteCacheByPattern",
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
