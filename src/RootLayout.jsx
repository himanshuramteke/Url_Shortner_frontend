import { Outlet } from "@tanstack/react-router";
import "./App.css";
import { NavBar } from "./components/NavBar";

function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
