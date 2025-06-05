import { Outlet } from "@tanstack/react-router";
import React from "react";
import Navbar from "./components/NavBar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
