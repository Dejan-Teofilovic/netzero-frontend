import React, { lazy } from 'react';
import { Navigate, useRoutes } from "react-router-dom";
import useUser from './hooks/useUser';
import Signup from './pages/Signup';

const LandingLayout = lazy(() => import('./layouts/LandingLayout'))
const HomePage = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/Login'))

export default function Routes() {
  const { token } = useUser()
  return useRoutes([
    {
      path: '/',
      element: <LandingLayout />,
      children: [
        {
          path: '',
          element: <HomePage />
        },
        {
          path: 'login',
          element: token ? <Navigate to="/" replace /> : <Login />
        },
        {
          path: 'signup',
          element: token ? <Navigate to="/" replace /> : <Signup />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);
}