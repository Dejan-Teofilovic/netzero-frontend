import React from "react";
import { Outlet } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
import Loading from "../../components/Loading";
import useLoading from "../../hooks/useLoading";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LandingLayout() {
  const { isLoading } = useLoading();

  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute inset-0 background bg-bottom bg-cover" style={{ backgroundImage: 'url("https://storage.googleapis.com/nori-prod-cms-uploads/bg_hero_a0cc1f017e/bg_hero_a0cc1f017e.png")' }} />
        <div className="relative">
          <Navbar />
          <AlertMessage className="absolute top-5 w-full" />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer className="mt-16" />
      </div>
      {isLoading && <Loading />}
    </>
  );
}
