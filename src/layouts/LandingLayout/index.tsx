import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
import Loading from "../../components/Loading";
import useLoading from "../../hooks/useLoading";

const Footer = lazy(() => import('./Footer'))
const Navbar = lazy(() => import('./Navbar'))

/* -------------------------------------------------------------------- */

export default function LandingLayout() {
  const { isLoading } = useLoading();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen flex flex-col relative">
          <Navbar />
          <AlertMessage className="fixed top-5 z-30 w-full" />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </Suspense>
      {isLoading && <Loading />}
    </>
  );
}
