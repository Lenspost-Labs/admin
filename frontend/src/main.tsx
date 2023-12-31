import React from "react";
import ReactDOM from "react-dom/client";
import "src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DelSpecificCachePage,
  DelCacheByPatternPage,
  LogoutPage,
  SettingsPage,
  ErrorPage,
  TemplatesPage,
  UsersPage,
  OneStepUpload,
  CollectionsPage,
  TasksPage,
  RewardsPage
} from "src/pages";
import App from "src/App";

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
      {
        path: "/collections",
        element: <CollectionsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/rewardLeaderboard",
        element: <RewardsPage />,
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
