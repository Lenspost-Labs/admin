import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DelSpecificCachePage,
  DelCacheByPatternPage,
  LogoutPage,
  SettingsPage,
  ErrorPage,
  FileToS3Page,
  UploadToDBPage,
  AssetJSONPage,
  TemplatesPage,
  UsersPage,
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
        element: <AssetJSONPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/uploadToDB",
        element: <UploadToDBPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/deleteCache",
        element: <DelSpecificCachePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/deleteCacheByPattern",
        element: <DelCacheByPatternPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/templates",
        element: <TemplatesPage/>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
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
