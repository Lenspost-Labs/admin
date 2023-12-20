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
  OneStepUpload,
} from "./routes";
import App from "./App";

// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/oneStepUpload",
        element: <OneStepUpload />,
        errorElement: <ErrorPage />,
      },
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
        element: <TemplatesPage />,
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
