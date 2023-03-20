import React, { lazy, useMemo } from 'react';
import { Navigate, useRoutes } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import useUser from './hooks/useUser';
import Signup from './pages/Signup';

const LandingLayout = lazy(() => import('./layouts/LandingLayout'))
const HomePage = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/Login'))
const ClaimToken = lazy(() => import('./pages/ClaimToken'))

export default function Routes() {
  const { token, user } = useUser()

  // const { user } = useMemo<any>(() => {
  //   if (token) {
  //     return jwt_decode(token)
  //   }
  //   return {}
  // }, [token])

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
          path: 'claim-token',
          element: token ? user?.id_user_type === 1 ? <ClaimToken /> : <Navigate to="/" replace /> : <Navigate to="/" replace />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);
}