import { Outlet } from "@tanstack/react-router";
import React from "react";
import Navbar from "./components/NavBar";

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
