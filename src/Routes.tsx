import React, { lazy, useMemo } from 'react';
import { Navigate, useRoutes } from "react-router-dom";
import useUser from './hooks/useUser';
import Signup from './pages/Signup';

const LandingLayout = lazy(() => import('./layouts/LandingLayout'))
const HomePage = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/Login'))
const ClaimToken = lazy(() => import('./pages/ClaimToken'))
const MyClaims = lazy(() => import('./pages/MyClaims'))
const OffsetProjects = lazy(() => import('./pages/OffsetProjects'))

export default function Routes() {
  const { token, user } = useUser()

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
          path: 'my-claims',
          element: token ? user?.id_user_type === 1 ? <MyClaims /> : <Navigate to="/" replace /> : <Navigate to="/" replace />
        },
        {
          path: 'offset-projects',
          element: token ? user?.id_user_type === 2 ? <OffsetProjects /> : <Navigate to="/" replace /> : <Navigate to="/" replace />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);
}