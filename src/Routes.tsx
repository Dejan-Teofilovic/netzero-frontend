import React from 'react';
import { Navigate, useRoutes } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import HomePage from "./pages/HomePage";

export default function Routes() {
  return useRoutes([
    {
      element: <LandingLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);
}